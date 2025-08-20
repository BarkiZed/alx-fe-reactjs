import React from "react";
import { useQuery } from "react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export default function PostsComponent() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery("posts", fetchPosts, {
    // Tune cache & staleness so you can observe behavior:
    // - Data is considered fresh for 10 seconds (no refetch on remount within 10s).
    staleTime: 10_000,
    // - Keep cached data for 5 minutes after unused.
    cacheTime: 5 * 60_000,
    // Avoid surprise refetch on window focus for the demo:
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return <p style={{ color: "crimson" }}>{error.message}</p>;

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button onClick={() => refetch()}>Refetch Now</button>
        {isFetching && <span>Updating…</span>}
      </div>

      <ul style={{ display: "grid", gap: "0.75rem" }}>
        {data.slice(0, 10).map((post) => (
          <li
            key={post.id}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: 8,
            }}
          >
            <strong>
              {post.id}. {post.title}
            </strong>
            <p style={{ margin: "0.5rem 0 0" }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
