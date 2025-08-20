import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient();

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
        <h1>React Query Demo</h1>
        <p>
          JSONPlaceholder Posts — demonstrates fetching, caching, manual refetch,
          and instant cache reads after unmount/remount.
        </p>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <button onClick={() => setShowPosts((s) => !s)}>
            {showPosts ? "Hide" : "Show"} Posts
          </button>
        </div>

        {showPosts && <PostsComponent />}
      </div>
    </QueryClientProvider>
  );
}
