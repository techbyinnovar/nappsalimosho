// app/login/page.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false, // handle redirect manually
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError("Invalid credentials");
      return;
    }

    // ✅ Fetch current session to check role
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (session?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else if (session?.user?.role === "SCHOOL_OWNER") {
      router.push("/owner/dashboard");
    } else {
      setError("Unknown user role");
    }
  };

  // ✅ Register Handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      alert("✅ Account created! Please log in.");
      setIsRegister(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full py-24 bg-green-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">
          {isRegister ? "Create Account" : "Login"}
        </h1>

        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}

        <form
          onSubmit={isRegister ? handleRegister : handleLogin}
          className="space-y-3"
        >
          {isRegister && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-md"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-md"
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 cursor-pointer"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-3 text-sm text-center">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                className="text-green-700 underline cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                className="text-green-700 underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create one
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
