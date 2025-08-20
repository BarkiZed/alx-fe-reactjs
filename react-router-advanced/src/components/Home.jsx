import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/profile/details">Profile Details</Link> |{" "}
        <Link to="/profile/settings">Profile Settings</Link> |{" "}
        <Link to="/blog/123">Blog Post 123</Link>
      </nav>
    </div>
  );
}
