import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

// components
import { Navbar, Spinner } from "./components";

//pages
import {
  HomePage,
  Login,
  SignUp,
  TaskListPage,
  ContactPage,
  ProfilePage,
} from "./pages";

import { useEffect, useState } from "react";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const laptopDesktopWidth = 1024; // Adjust this value as needed

      if (screenWidth < laptopDesktopWidth) {
        alert("This website is only accessible on desktop and laptop devices.");
      }
    };

    handleWindowSize();

    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  useEffect(() => {
    const checkAuthStatus = () => {
      if (
        localStorage.getItem("user") === null &&
        location.pathname !== "/sign-up"
      ) {
        setShowNavbar(false); // Hide Navbar if user is not authenticated
        navigate("/login");
      } else {
        setShowNavbar(true); // Show Navbar if user is authenticated
      }
      setLoading(false); // Set loading to false after authentication check
    };

    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/sign-up") {
      setShowNavbar(false); // Hide Navbar on login and sign-up routes
    } else {
      setShowNavbar(true); // Show Navbar on other routes
    }
  }, [location]);

  return (
    <div className="">
      {loading ? ( // Show loading indicator if still loading
        <Spinner />
      ) : (
        <>
          {showNavbar && <Navbar />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TaskListPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
