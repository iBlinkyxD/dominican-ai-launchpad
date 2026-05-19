import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/api/axios";

type State = "loading" | "success" | "declined" | "error";

const WaitlistRespond = () => {
  const [state, setState] = useState<State>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const action = params.get("action");

    if (!token || !action) {
      setState("error");
      setMessage("Invalid link. Please check the email and try again.");
      return;
    }

    api
      .get(`/waitlist/respond?token=${encodeURIComponent(token)}&action=${encodeURIComponent(action)}`)
      .then((res) => {
        if (action === "accept") {
          setState("success");
        } else {
          setState("declined");
        }
        setMessage(res.data.message || "");
      })
      .catch((err) => {
        setState("error");
        setMessage(err.response?.data?.detail || "Something went wrong. The link may be expired or already used.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        {state === "loading" && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-[#0B1E40] mx-auto mb-4" />
            <p className="text-gray-600">Processing your response…</p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B1E40] mb-2">Student Accepted!</h1>
            <p className="text-gray-600 mb-2">
              The student has been enrolled in your course and notified by email.
              Payment has been processed successfully.
            </p>
            <p className="text-sm text-gray-400 mb-8">{message}</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#0B1E40] text-white rounded-lg font-semibold hover:bg-[#0B1E40]/90 transition-colors"
            >
              Back to Home
            </Link>
          </>
        )}

        {state === "declined" && (
          <>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-9 h-9 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B1E40] mb-2">Request Declined</h1>
            <p className="text-gray-600 mb-8">
              The student has been notified and our team will find them another teacher.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#0B1E40] text-white rounded-lg font-semibold hover:bg-[#0B1E40]/90 transition-colors"
            >
              Back to Home
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-9 h-9 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-[#0B1E40] mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#0B1E40] text-white rounded-lg font-semibold hover:bg-[#0B1E40]/90 transition-colors"
            >
              Back to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitlistRespond;
