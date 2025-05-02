// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PhoneVerification from "./pages/PhoneVerification";

// function App() {
//   const isLoggedIn = !!localStorage.getItem("token");

//   return (
//     // routes mai hm guide krte hh ki mtlab hm isse instructions de dete hh ki jb url mai upper /home, /login, /signup (of our wish we have these names down) ayee to vo wala page open ho jaye jo uss routep assign hua h
//     // like path="/signup" (name suggested by developer) is given to open Signup page by element={<Signup>}. mtlb yha p ye developer instruction de rha h ki /signup type krke uper url m Signup.jsx wala page (yani Signup named component open ho jaye (upper import krke rakha h path deke)) khul jaye
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
//         />
//         {/* this is wrong way i am doing as our home page always must be "/" but now we have done "/home" everywhere so we are required to add "/" to login so that when initially website opens then blank page should not appear so by default our basic home page is done always "/" as so website opens without auth it should appear and to logo buttons also "/" this is give , as a reason */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/verify-phone" element={<PhoneVerification />} />
//         {/* IMP Protect /home route  we are using ProtectedRoute component in this home route special as we not want to access users to acess home page without logging in so to protect the /home route from unauthenticated users as some users may try to access the /home route without logging in by adding path in url /home like this */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PhoneVerification from "./pages/PhoneVerification";

// ✅ Import Google OAuth Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    // ✅ Wrapping entire router inside GoogleOAuthProvider so that Google login works in all components
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {/* routes mai hm guide krte hh ki mtlab hm isse instructions de dete hh ki jb url mai upper /home, /login, /signup (of our wish we have these names down) ayee to vo wala page open ho jaye jo uss routep assign hua h
      like path="/signup" (name suggested by developer) is given to open Signup page by element={<Signup>}. mtlb yha p ye developer instruction de rha h ki /signup type krke uper url m Signup.jsx wala page (yani Signup named component open ho jaye (upper import krke rakha h path deke)) khul jaye */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
          />
          {/* this is wrong way i am doing as our home page always must be "/" but now we have done "/home" everywhere so we are required to add "/" to login so that when initially website opens then blank page should not appear so by default our basic home page is done always "/" as so website opens without auth it should appear and to logo buttons also "/" this is give , as a reason */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-phone" element={<PhoneVerification />} />
          {/* IMP Protect /home route  we are using ProtectedRoute component in this home route special as we not want to access users to acess home page without logging in so to protect the /home route from unauthenticated users as some users may try to access the /home route without logging in by adding path in url /home like this */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
