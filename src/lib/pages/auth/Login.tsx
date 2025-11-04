import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import logo from "../../../assets/images/logo.png";
import { loginStaff, persistAuth } from "../../../services/authService";
void loginStaff; void persistAuth; // keep imports while API is temporarily disabled

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  void setLoading; void setError; // silence unused while API is disabled

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TEMP: Bypass login API due to issues. Route directly to dashboard.
    // navigate("/dashboard");
    // return;

    // --- Original API flow (kept for later re-enable) ---
    setError(null);
    setLoading(true);
    try {
      try {
        console.log("[Login] Submitting credentials", { work_email: email, password: "***" });
      } catch {}
      const res = await loginStaff({ work_email: email, password });
      if (res?.status) {
        try {
          console.log("[Login] API success", res);
        } catch {}
        persistAuth(res);
        navigate("/dashboard");
      } else {
        setError(res?.message || "Login failed");
      }
    } catch (e: any) {
      try {
        console.error("[Login] API error", e);
      } catch {}
      setError(e?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="PickaPart Manager" className="h-10 mb-4" />
          <h1 className="text-3xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your email and password to sign in</p>
        </div>

        <div className="rounded-xl shadow-xl p-8 bg-gradient-to-r from-emerald-700 to-emerald-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/90 text-sm mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full rounded-md border-0 px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-white/90 text-sm mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-md border-0 px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            {error ? (
              <div className="text-sm text-red-50 bg-red-500/40 border border-red-400 rounded px-3 py-2">
                {error}
              </div>
            ) : null}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <input id="remember" type="checkbox" className="h-4 w-4 text-emerald-600" disabled={loading} />
              <label htmlFor="remember" className="select-none">Remember me</label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-md py-3 transition-colors"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button className="h-10 w-10 rounded-md border border-gray-200 bg-white text-gray-600">G</button>
            <button className="h-10 w-10 rounded-md border border-gray-200 bg-white text-gray-600">X</button>
            <button className="h-10 w-10 rounded-md border border-gray-200 bg-white text-gray-600">in</button>
          </div>
        </div>
      </div>
    </div>
  );
}


