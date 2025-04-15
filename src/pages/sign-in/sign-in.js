import { useState } from "react";
import { useNavigate } from "react-router";
import WeatherProFooter from "../../components/weather-pro-footer";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ReactComponent as SunIcon } from "../../assets/vector-images/sun.svg";
import { SignedIn, SignedOut, useSignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn: signInInstance } = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signIn = await signInInstance.create({
        identifier: username,
        password,
      });
      if (signIn.status === "complete") {
        navigate("/forecast");
      } else {
        console.error("Sign-in incomplete:", signIn);
      }
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  return (
    <>
      <SignedOut>
        <div className="min-h-screen bg-[#fcfef2] flex flex-col">
          <div className="flex-grow flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full mx-auto">
              <h1 className="text-6xl mb-12 font-display text-center font-newRomantics">
                Welcome back
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 flex flex-col items-center w-full">
                  <label className="block text-left font-magazineLetter text-3xl tracking-widest uppercase">
                    username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full py-2 px-3 bg-[#f1f4eb] rounded-xl outline-none font-newRomantics backdrop-blur-3xl"
                    required
                  />
                </div>

                <div className="space-y-2 flex flex-col items-center w-full">
                  <label className="block text-left font-magazineLetter text-3xl tracking-widest uppercase">
                    password
                  </label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-2 px-3 bg-[#f1f4eb] rounded-xl  outline-none font-newRomantics backdrop-blur-3xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={16} className="opacity-60" />
                      ) : (
                        <EyeIcon size={16} className="opacity-60" />
                      )}
                    </button>
                  </div>
                  <div className="flex self-start items-center pt-2 cursor-pointer">
                    <SunIcon className="w-8 h-8 mr-2" />
                    <span className="text-xs font-atherosser opacity-60">
                      Remember Me
                    </span>
                  </div>
                </div>

                <div className="pt-6 flex justify-center">
                  <button
                    type="submit"
                    className="tracking-wide py-2 px-4 font-newRomantics text-2xl"
                  >
                    sign in
                  </button>
                </div>
              </form>
            </div>
          </div>

          <WeatherProFooter />
        </div>
      </SignedOut>
    </>
  );
}
