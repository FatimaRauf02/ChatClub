import { useState } from "react";
import { PhoneCallIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const BRAND_COLOR = "#B5004A";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: "#f9f9f9",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
        style={{ border: `2px solid ${BRAND_COLOR}20` }}
      >
        {/* LEFT - IMAGE */}
        <div
          className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-0 relative overflow-hidden"
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
            style={{
              background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
            }}
          >
            <h2 className="text-2xl font-bold">
             
            </h2>

            <p className="text-sm opacity-80 mt-1">
              
            </p>
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
              <PhoneCallIcon
                className="size-7"
                style={{ color: BRAND_COLOR }}
              />
            </div>

            <span
              className="text-3xl font-extrabold tracking-tight"
              style={{
                color: BRAND_COLOR,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              ChatClub
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="px-4 py-3 rounded-lg mb-4 text-sm"
              style={{
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
              }}
            >
              {error.response?.data?.message}
            </div>
          )}

          {/* HEADING */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Join ChatClub and start connecting!
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* FULL NAME */}
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1.5">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition"
                style={{
                  borderColor: "#e5e7eb",
                  fontFamily: "'Poppins', sans-serif",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = BRAND_COLOR)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "#e5e7eb")
                }
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    fullName: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1.5">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition"
                style={{
                  borderColor: "#e5e7eb",
                  fontFamily: "'Poppins', sans-serif",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = BRAND_COLOR)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "#e5e7eb")
                }
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-1.5">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition"
                style={{
                  borderColor: "#e5e7eb",
                  fontFamily: "'Poppins', sans-serif",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = BRAND_COLOR)
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "#e5e7eb")
                }
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    password: e.target.value,
                  })
                }
                required
              />

              <p className="text-xs text-gray-400 mt-1">
                At least 6 characters
              </p>
            </div>

            {/* TERMS */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded"
                required
                style={{ accentColor: BRAND_COLOR }}
              />

              <span className="text-xs text-gray-500">
                I agree to the{" "}
                <span
                  style={{ color: BRAND_COLOR }}
                  className="cursor-pointer font-semibold"
                >
                  terms of service
                </span>
              </span>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: BRAND_COLOR,
                fontFamily: "'Poppins', sans-serif",
              }}
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Create Account"
              )}
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: BRAND_COLOR }}
                className="font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;