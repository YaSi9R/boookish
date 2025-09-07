import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "My Posts",
    path: "/dashboard/my-posts",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscBook",
  },
  {
    id: 3,
    name: "Add Post",
    path: "/dashboard/add-post",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscAdd",
  },
  {
    id: 4,
    name: "Favorites",
    path: "/dashboard/favorites",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHeart",
  },
  {
    id: 5,
    name: "All Posts",
    path: "/dashboard/admin/posts",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscBook",
  },
  {
    id: 6,
    name: "All Users",
    path: "/dashboard/admin/users",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscPerson",
  },
]
