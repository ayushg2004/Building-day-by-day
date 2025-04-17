import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/index.css";

const PhoneVerification = ({ onVerified }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, []);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/otp/send-otp", { phone });
      setStep(2);
      setMessage("✅ OTP sent! Check your phone.");
      setMessageType("success");
    } catch (err) {
      setMessage("❌ Failed to send OTP.");
      setMessageType("error");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verify-otp", {
        phone,
        otp,
      });
      if (res.data.verified) {
        setMessage("✅ OTP verified! Redirecting...");
        setMessageType("success");
        localStorage.setItem("verifiedPhone", phone);
        setTimeout(() => {
          onVerified(phone);
        }, 1500);
      } else {
        setMessage("❌ Invalid OTP.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Error verifying OTP.");
      setMessageType("error");
    }
    setLoading(false);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === 1 && !loading) handleSendOTP();
      else if (step === 2 && !loading) handleVerifyOTP();
    }
  };

  return (
    <div className="phone-verification-container">
      <h2>📱 Phone Verification</h2>

      {message && <p className={`message ${messageType}`}>{message}</p>}

      <form className="verification-form" onKeyDown={handleKeyPress}>
        {step === 1 ? (
          <>
            <input
              ref={phoneInputRef}
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={handleSendOTP}
              className="button"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
              required
            />
            <button
              type="button"
              onClick={handleVerifyOTP}
              className="button"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default PhoneVerification;
