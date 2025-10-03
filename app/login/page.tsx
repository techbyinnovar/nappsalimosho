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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: true,
      email: form.email,
      password: form.password,
      callbackUrl: "/admin/dashboard",
    });
    if (res?.error) setError("Invalid credentials");
  };

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
      alert("Account created! Please log in.");
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

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-3">
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




// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     setLoading(false);

//     if (res?.error) {
//       setError(res.error);
//     } else {
//       router.push("/admin/dashboard");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-full py-24 bg-green-50">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm bg-white shadow-lg rounded-lg px-8 py-6"
//       >
//         <h1 className="text-2xl font-bold text-center mb-6 text-[#198754]">
//           Admin Login
//         </h1>

//         {error && (
//           <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
//         )}

//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#198754] focus:border-[#198754] text-sm"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#198754] focus:border-[#198754] text-sm"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 font-semibold rounded-md shadow-md text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-[#198754] hover:bg-[#157347] focus:ring-[#198754]"
//           }`}
//         >
//           {loading ? (
//             <span className="flex items-center justify-center">
//               <svg
//                 className="animate-spin h-5 w-5 mr-2 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
//                 ></path>
//               </svg>
//               Logging in...
//             </span>
//           ) : (
//             "Login"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }
