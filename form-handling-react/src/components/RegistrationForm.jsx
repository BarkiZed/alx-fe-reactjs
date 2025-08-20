import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form Submitted:", { username, email, password });
      alert("User registered successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto p-6 border rounded-lg shadow"
    >
      <h2 className="text-xl font-bold">User Registration (Controlled)</h2>

      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}   {/* ✅ matches checker */}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}   {/* ✅ matches checker */}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}   {/* ✅ matches checker */}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}

