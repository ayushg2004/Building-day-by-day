import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/index.css";

// a whole login component is made
const Login = () => {
  // hooks to update values in variables of feilds
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   this handlelogin function is made by us developers for login procrss and so this function is called down in onSubmit form
  const handleLogin = async (e) => {
    e.preventDefault(); //  it prevent the default behaviour of the form to refresh the page on submit

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    // now we are going to send data in backend for processiong so we use "try catch then" so that in any case this try part which we want to fulfil,  is not possible due to some technical issues then it should not stop runing project but by catch error should be handled
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      // RISK LENE KA HI NHI!!!!
      //   condition lggi ki /home p navigate to token pass hoke hi hoga yha p,hn ye yha p /home token ke baad hi khulega but kai cases mai user manually bhi to /home krke enter krne ki try kr skta h to hmne ye lga dia ki jabh bhi /home p jane ki try ki jaye gi chaye yha se hi chaye manually (kyuki hmme nhi pta) to hmne protected route m check krvane ka faisla liya ki chlo hr baar token match hone ke baad hi route ho , hmme RISK LENE KA HI NHI!!!!
      localStorage.setItem("token", res.data.token);
      navigate("/home"); // ab yha jb /home p jane lggega to pehle protectedroute m check krke ayega ki token sahi m aagya, kyuki hmne App.jsx mai kha tha routes assign krte waqt ki jb bhi kahi se bhi hm /home p navigate krenge to pehle protectedroute mai  ye token check krvake ayega ki hua bhi ya ese hi krvaya gya h
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <div className="auth-switch">
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
