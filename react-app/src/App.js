import './App.css';
import Navbar from './Components/Common/Navbar';
import { Route, Routes, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import OpenRoute from './Components/Core/Auth/OpenRoute';
import Error from './Pages/Error';
import Home from './Pages/Home';



function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />

        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} /> */}
        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        {/* <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        /> */}
        {/* <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        /> */}
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        {/* <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        /> */}
        {/* Private Route - for Only Logged in User */}
        {/* <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        > */}
          {/* Route for all users */}
          {/* <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} /> */}
          {/* Route only for Instructors */}
          {/* {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
          Route only for Students */}
          {/* {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
          <Route path="dashboard/settings" element={<Settings />} />
        </Route> */}

        {/* For the watching course lectures */}
        {/* <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        > */}
          {/* {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route> */}

        {/* 404 Page */}
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </div>
    
  );
}

export default App;
