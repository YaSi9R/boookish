const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
require("dotenv").config();

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
	console.log("Signup Request Body:", req.body);

  try {
    const {
      Name,
      contactNumber,
      email,
      password,
      accountType,
      otp,
    } = req.body;

    if (!Name || !contactNumber || !email || !password ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
	console.log("Fetched OTP:", response);
console.log("Provided OTP:", otp);


    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Profile document
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: contactNumber, // Optionally store it here too
    });

    // Create User document
    const user = await User.create({
      Name,
      contactNumber,
      email,
      password: hashedPassword,
      account_type: accountType || "Student",
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${Name}`,
      additionalDetails: profileDetails._id,
    });

    return res.status(201).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).populate("additionalDetails");

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};

// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
	try {
	  const { email } = req.body;
  
	  // Check if user already exists
	  const checkUserPresent = await User.findOne({ email });
	  if (checkUserPresent) {
		return res.status(409).json({
		  success: false,
		  message: `User is already registered`,
		});
	  }
  
	  // Generate unique 6-digit OTP
	  let otp;
	  let result;
	  do {
		otp = otpGenerator.generate(6, {
		  upperCaseAlphabets: false,
		  lowerCaseAlphabets: false,
		  specialChars: false,
		});
		result = await OTP.findOne({ otp });
	  } while (result);
  
	  // Save OTP to DB
	  const otpPayload = { email, otp };
	  const otpBody = await OTP.create(otpPayload);
  
	  console.log("OTP Sent:", otp);
	  res.status(200).json({
		success: true,
		message: `OTP sent successfully`,
		otp, // Consider removing in production
	  });
	} catch (error) {
	  console.error("SENDOTP ERROR:", error.message);
	  return res.status(500).json({
		success: false,
		message: "Internal Server Error",
		error: error.message,
	  });
	}
  };
  
  

