// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export default function PostsComponent() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10000, // 10 seconds before data is considered stale
    cacheTime: 5 * 60 * 1000, // keep cached data for 5 minutes
    refetchOnWindowFocus: false, // don't refetch when window gains focus
    keepPreviousData: true, // keeps previous data while fetching new
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()} disabled={isFetching} style={{ marginBottom: "1rem" }}>
        {isFetching ? "Refreshing…" : "Refetch Now"}
      </button>

      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id} style={{ marginBottom: "1rem" }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
