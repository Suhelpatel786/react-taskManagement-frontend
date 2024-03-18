import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// components
import { Navbar } from "./components";

//pages
import { MainPage, Login, SignUp } from "./pages";
import { useEffect, useState } from "react";
import path from "path";

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
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
