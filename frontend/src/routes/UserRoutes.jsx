import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import UserLayout from "../pages/UserLayout";
import UserHome from "../pages/UserHome";
import { useUser } from "@clerk/react";
import ArticleWriting from "../pages/ArticleWriting";
import BackgroundRemoval from "../pages/BackgroundRemoval";
// import ImageGeneration from "../pages/ImageGeneration";
import ObjectRemoval from "../pages/ObjectRemoval";
import TitleGenerator from "../pages/TitleGenerator";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";

function UserRoutes() {
  const { isSignedIn } = useUser();

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/"
        element={
          <Home />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/whatai"
        element={
          <UserLayout />
        }
      >
        <Route path="userHome" element={<UserHome />} />
        <Route path="articleWriter" element={<ArticleWriting />} />
        <Route path="backgroundRemoval" element={<BackgroundRemoval />} />
        {/* <Route path="imageGeneration" element={<ImageGeneration />} /> */}
        <Route path="objectRemoval" element={<ObjectRemoval />} />
        <Route path="blogTitleGenerator" element={<TitleGenerator />} />
        <Route path="resumeAnalyzer" element={<ResumeAnalyzer />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;