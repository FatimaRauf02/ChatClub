import { useState } from "react";
import { PhoneCallIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const BRAND_COLOR = "#B5004A";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#f9f9f9", fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
        style={{ border: `2px solid ${BRAND_COLOR}20` }}
      >
        {/* LEFT - IMAGE */}
        <div
          className="hidden lg:flex w-full lg:w-1/2 items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: BRAND_COLOR, minHeight: "500px" }}
        >
          <img
            src="/i.png"
            alt="ChatClub"
            className="w-full h-full object-cover absolute inset-0"
            style={{ objectPosition: "center" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 p-6 text-white text-center"
            style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.5))" }}
          >
            <h2 className="text-2xl font-bold"></h2>
            <p className="text-sm opacity-80 mt-1"></p>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-white flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-8 flex items-center gap-3">
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: `${BRAND_COLOR}15` }}
            >
              <PhoneCallIcon className="size-7" style={{ color: BRAND_COLOR }} />
            </div>
            <span
              className="text-3xl font-extrabold tracking-tight"
              style={{ color: BRAND_COLOR, fontFamily: "'Poppins', sans-serif" }}
            >
              ChatClub
            </span>
          </div>

          {error && (
            <div
              className="px-4 py-3 rounded-lg mb-4 text-sm"
              style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}
            >
              {error.response?.data?.message}
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to your ChatClub account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition"
                style={{ borderColor: "#e5e7eb", fontFamily: "'Poppins', sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLOR)}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition"
                style={{ borderColor: "#e5e7eb", fontFamily: "'Poppins', sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = BRAND_COLOR)}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90 active:scale-95 mt-2"
              style={{ backgroundColor: BRAND_COLOR, fontFamily: "'Poppins', sans-serif" }}
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 pt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: BRAND_COLOR }}
                className="font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;