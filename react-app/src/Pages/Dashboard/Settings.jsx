import ChangeProfilePicture from "../../Components/DashBoard/Settings/ChangeProfilePicture"
import DeleteAccount from "../../Components/DashBoard/Settings/DeleteAccount"
import EditProfile from "../../Components/DashBoard/Settings/EditProfile"
import UpdatePassword from "../../Components/DashBoard/Settings/UpdatePassword"

export default function Settings() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  )
}
