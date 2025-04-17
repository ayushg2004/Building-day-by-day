import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/index.css";
import PhoneVerification from "../pages/PhoneVerification"; // adjust path if needed

// a whole signup component is made
const Signup = () => {
  // hooks to update values in variables of feilds
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const navigate = useNavigate();

  // Frontend validations   means this details will go from there only to store into backend DB so these details check in frontend only

  useEffect(() => {
    const storedPhone = localStorage.getItem("verifiedPhone");
    if (storedPhone) {
      setPhone(storedPhone);
      setIsPhoneVerified(true);
    }
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(
      password
    );
  };

  //   this handleSignup function is made by us developers for signup procrss and so this function is called down in onSubmit form

  const handleSignup = async (e) => {
    e.preventDefault(); //  it prevent the default behaviour of the form to refresh the page on submit

    if (!username || !email || !password) {
      return setError("All fields are required.");
    }

    //these functions are made above by us developers
    if (!validateEmail(email)) {
      return setError("Invalid email format.");
    }
    if (!validatePassword(password)) {
      return setError(
        "Password must be 8+ chars with upper, lower, number & special char."
      );
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match."); // ✅ NEW
    }

    if (!phone) {
      return setError("Phone verification required before signup.");
    }
    //    backend validations like these details already exists are checked and done in backend only and that like wise response will come to frontend that registerd succesfull or not

    // now we are going to send data in backend for processiong so we use "try catch then" so that in any case this try part which we want to fulfil,  is not possible due to some technical issues then it should not stop runing project but by catch error should be handled
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
        phone,
      });

      alert("Registered successfully!");
      localStorage.removeItem("verifiedPhone"); // ✅ clear after use
      navigate("/login");
    } catch (err) {
      setError("Failed! Username or Email might be taken.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      {!isPhoneVerified ? (
        <PhoneVerification
          onVerified={(verifiedPhone) => {
            setPhone(verifiedPhone);
            setIsPhoneVerified(true);
          }}
        />
      ) : (
        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            onCopy={(e) => e.preventDefault()}
            title="Copy/Paste is disabled for security" //  by these three we can prevent copy past and cut from password fields
            onPaste={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            onCopy={(e) => e.preventDefault()}
            title="Copy/Paste is disabled for security"
            onPaste={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          />

          {/* ✅ Phone shown as verified and disabled */}
          <input
            type="text"
            value={phone}
            disabled
            className="disabled-input"
            placeholder="Verified Phone"
          />

          <button type="submit">Signup</button>
          {error && <p className="error-message">{error}</p>}
          <div className="auth-switch">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
