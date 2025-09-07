const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// SETTINGS ENDPOINTS
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// POSTS ENDPOINTS
export const postEndpoints = {
  GET_ALL_POSTS_API: BASE_URL + "/posts",
  GET_POST_BY_ID_API: BASE_URL + "/posts",
  CREATE_POST_API: BASE_URL + "/posts/create",
  GET_MY_POSTS_API: BASE_URL + "/posts/user/my-posts",
  UPDATE_POST_API: BASE_URL + "/posts",
  DELETE_POST_API: BASE_URL + "/posts",
}

// FAVORITES ENDPOINTS
export const favoritesEndpoints = {
  ADD_TO_FAVORITES_API: BASE_URL + "/favorites/add",
  REMOVE_FROM_FAVORITES_API: BASE_URL + "/favorites/remove",
  GET_FAVORITES_API: BASE_URL + "/favorites",
  CHECK_FAVORITE_API: BASE_URL + "/favorites/check",
}
