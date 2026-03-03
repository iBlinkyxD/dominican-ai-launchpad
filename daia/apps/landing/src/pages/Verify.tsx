import { useState, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import daiaLogo from "@/assets/DAIA-logo.png";
import { Link } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.match(/\d/g);

    if (digits) {
      const newCode = [...code];
      digits.forEach((digit, index) => {
        if (index < 6) {
          newCode[index] = digit;
        }
      });
      setCode(newCode);

      // Focus the next empty input or the last input
      const nextEmptyIndex = newCode.findIndex((val) => !val);
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("Verification code submitted:", verificationCode);
    // Navigate to hub page after verification
    navigate("/hub");
  };

  const handleResend = () => {
    console.log("Resending verification code...");
    // Add resend logic here
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={daiaLogo} alt="DAIA Logo" className="h-16 w-auto" />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Your Account
          </h1>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to your email address
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter Verification Code
            </label>
            <div
              className="flex gap-2 sm:gap-3 justify-center mx-auto w-full max-w-xs"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="
                      flex-1
                      min-h-14 min-w-12
                      text-center
                      text-xl sm:text-2xl
                      font-bold
                      border-2 border-gray-300
                      rounded-lg
                      focus:outline-none
                      focus:ring-2 focus:ring-blue-500
                      focus:border-transparent
                      transition
                    "
                  required
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isCodeComplete}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition font-medium flex items-center justify-center gap-2 group disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Verify Account
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="font-medium text-blue-600 hover:text-blue-700 underline"
              >
                Resend Code
              </button>
            </p>
          </div>

          {/* Back Button */}
          <Link to="/signUp">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Verify;
