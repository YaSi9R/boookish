import { useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import toast from "react-hot-toast";
import bgImage from "../assets/Images/login.jpg";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();

    if (!signupData) {
      toast.error("Signup data missing");
      return;
    }

    const {
      Name,
      contactNumber,
      email,
      password,
      accountType,
    } = signupData;

    console.log("SIGNUP payload →", {
      Name,
      contactNumber,
      email,
      password,
      accountType,
      otp,
    });

    if (!Name || !contactNumber || !email || !password || !otp) {
      toast.error("Missing required fields.");
      return;
    }

    const success = await dispatch(
      signUp(Name, contactNumber, email, password, accountType, otp, navigate)
    );

    if (success) {
      toast.success("Signup successful!");
      navigate("/login");
    } else {
      toast.error("Signup failed");
    }
  };

  return (
    <>
      <div
        className="parallex section-padding w-full h-[100px] flex items-center justify-center"
        style={{
          background: `rgba(0, 0, 0, 0) url(${bgImage}) center center no-repeat`,
          backgroundSize: "cover",
        }}
      >

      </div>
      <div className="min-h-[calc(50vh-3.5rem)] grid justify-center items-start pt-8 mb-[50px] sm:px-6 md:px-8">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="w-full max-w-[500px] p-4 sm:p-6 md:p-8 lg:p-8">
            <h1 className="text-[#E74C3C] font-semibold text-[1.5rem] sm:text-[1.875rem] leading-[2rem] sm:leading-[2.375rem]">
              Verify Email
            </h1>
            <p className="text-[1rem] sm:text-[1.125rem] leading-[1.5rem] sm:leading-[1.625rem] my-4 text-richblack-300">
              A verification code has been sent to your email. Enter the code below.
            </p>

            <form onSubmit={handleVerifyAndSignup}>
                      <div className="flex justify-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">

              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                className="w-[44px] sm:w-[48px] lg:w-[60px] bg-richblack-100 rounded-[0.5rem] text-black font-bold text-center aspect-square focus:border-0 focus:outline-2 focus:outline-[#E74C3C]"
                  />
                )}
                containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
              />
              </div>
              <button
                type="submit"
                className="w-full bg-[#E74C3C] py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white hover:bg-[#b52417] duration-[75] "
              >
                Verify Email
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <Link to="/signup">
                <p className="text-richblack-5 flex items-center gap-x-2">
                  <BiArrowBack /> Back To Signup
                </p>
              </Link>

              <button
                className="flex items-center text-blue-100 gap-x-2"
                onClick={() =>
                  signupData?.email
                    ? dispatch(sendOtp(signupData.email,navigate))
                    : toast.error("Email not found")
                }
              >
                <RxCountdownTimer />
                Resend it
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VerifyEmail;
