import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/index.css";

const PhoneVerification = ({ onVerified }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
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
        otp: otp.join(""),
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const isOtpComplete = otp.every((digit) => digit !== "");
      if (step === 2 && isOtpComplete && !loading) {
        handleVerifyOTP();
      }
    }
  };

  const otpRefs = useRef([]);

  const handleOTPChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next box
    if (index < 5 && value) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent default behavior

      const updatedOtp = [...otp];

      // If current box has a digit, clear it
      if (otp[index]) {
        updatedOtp[index] = "";
        setOtp(updatedOtp.join(""));
      }
      // If empty, move to previous box and clear that
      else if (index > 0) {
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp.join(""));
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="phone-verification-container">
      <h2>📱 Phone Verification</h2>

      {message && <p className={`message ${messageType}`}>{message}</p>}

      <form className="verification-form">
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
            {step === 2 ? (
              <div className="otp-inputs">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    ref={(el) => (otpRefs.current[i] = el)}
                    value={otp[i] || ""}
                    onChange={(e) => handleOTPChange(e, i)}
                    onKeyDown={(e) => handleOTPKeyDown(e, i)}
                    onKeyUp={(e) => handleKeyPress(e)}
                    className="otp-box"
                  />
                ))}
              </div>
            ) : null}

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
