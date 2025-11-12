import "./Login.css";
import {useUserLogin } from "../../CustomHooks/useUserLogin";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const { email, setEmail, password, setPassword, loginUser,isSuccess } = useUserLogin();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser();
      isSuccess ? navigate("/") : null
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="Login-page">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign in to your account</p>

        <div className="input-container">
          <input
            placeholder="Enter email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="submit" type="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account? <a href="Register">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Loginpage