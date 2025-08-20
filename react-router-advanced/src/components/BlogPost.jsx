import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return (
    <div>
      <h1>Blog Post #{id}</h1>
      <p>This is a dynamically routed blog post.</p>
    </div>
  );
}
