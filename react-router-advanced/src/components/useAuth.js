// Simulated authentication hook
import { useState } from "react";

export default function useAuth() {
  // toggle to true/false to simulate login status
  const [user] = useState({ loggedIn: false });
  return { isAuthenticated: user.loggedIn };
}
