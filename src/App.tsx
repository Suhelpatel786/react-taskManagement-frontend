import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// components
import { Navbar } from "./components";

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

  useEffect(() => {
    const path = window.location.pathname;
    setShowNavbar(!(path === "/login" || path === "/sign-up"));
  }, []);

  return (
    <div className="">
      <BrowserRouter>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
