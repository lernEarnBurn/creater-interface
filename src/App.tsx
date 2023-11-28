import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { NavBar } from "./components/NavBar";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";
import { MyBlogMenu } from "./components/MyBlogMenu";
import { EditBlogPage } from "./components/EditBlogPage";
import { CreateBlogPage } from "./components/CreateBlogPage";

import { RouteHistoryContext } from "./contexts/routeHistoryContext.js";
import { ThemeProvider } from "@/components/theme-provider";

import { AnimatePresence } from "framer-motion";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const [routeHistory, setRouteHistory] = useState<string[]>([]);

  const location = useLocation();

  //now need to run prettier
  //need to host all 3 parts
  //wire the front ends up to each other
  //populate some comments
  //Make readMe properly

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <RouteHistoryContext.Provider value={{ routeHistory, setRouteHistory }}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                loggedIn ? <Navigate to="/blogs" /> : <Navigate to="/log-in" />
              }
            />
            <Route
              path="/log-in"
              element={<LoginForm setLoggedIn={setLoggedIn} />}
            />
            <Route
              path="/sign-up"
              element={<SignupForm setLoggedIn={setLoggedIn} />}
            />
            <Route path="/blogs" element={<MyBlogMenu />} />
            <Route path="/blogs/:postId" element={<EditBlogPage />} />
            <Route path="/blogs/create-blog" element={<CreateBlogPage />} />
          </Routes>
        </AnimatePresence>
      </RouteHistoryContext.Provider>
    </ThemeProvider>
  );
}

export default App;
