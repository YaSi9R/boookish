/* eslint-disable react-hooks/rules-of-hooks */
import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,

} = endpoints

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });

            console.log("SENDOTP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // toast.success("OTP Sent Successfully");
            navigate("/verify-email");

            // ✅ Return early to avoid hitting the catch block after navigation
            return true;
        } catch (error) {
            console.log("SENDOTP API ERROR............", error);
            toast.error(error?.response?.data?.message );
            return false;
        } finally {
            dispatch(setLoading(false));
            // toast.dismiss(toastId);
        }
    };
}


export function signUp(Name, contactNumber, email, password, accountType, otp) {
    return async (dispatch) => {
        // dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                Name,
                contactNumber,
                email,
                password,
                accountType,
                otp,
            });

            console.log("Payload to SIGNUP API:", {
                Name,
                contactNumber,
                email,
                password,
                accountType,
                otp,
            });


            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // toast.success("Signup Successful from frontend");
            return true; // ✅ Let the caller navigate
        } catch (error) {
            console.log("SIGNUP API ERROR............", error.response?.data || error);
            toast.error("Signup Failed");
            return false;
        } finally {
            dispatch(setLoading(false));
           
        }
    };
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })

            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful")

            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.avatar
                ? response.data.user.avatar
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.Name} }`
            const userData = response.data.user || {}
            console.log("Dispatching setUser with:", userData)
            dispatch(setUser({
                ...userData,
                image: userImage, // Ensure image is passed in case it's not in the response
            }))

            localStorage.setItem("user", JSON.stringify({ ...userData, image: userImage }))

            console.log("Dispatched setUser with:", { ...response.data.user, image: userImage })
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/home")
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })

            console.log("RESETPASSTOKEN RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log("RESETPASSTOKEN ERROR............", error)
            toast.error("Failed To Send Reset Email")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

// export function resetPassword(password, confirmPassword, token, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", RESETPASSWORD_API, {
//         password,
//         confirmPassword,
//         token,
//       })

//       console.log("RESETPASSWORD RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Password Reset Successfully")
//       navigate("/login")
//     } catch (error) {
//       console.log("RESETPASSWORD ERROR............", error)
//       toast.error("Failed To Reset Password")
//     }
//     toast.dismiss(toastId)
//     dispatch(setLoading(false))
//   }
// }

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}
