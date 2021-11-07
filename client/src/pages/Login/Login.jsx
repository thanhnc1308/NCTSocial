import { useContext, useEffect, useRef } from "react";
import "./login.scss";
import AuthAPI from '../../api/AuthAPI';
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { CircularProgress } from "@mui/material";

export default function Login() {
  // we can use useState here but shouldn't
  // because it will re-render the page everytime we
  // change the input. We should prevent the re-rendering
  // as much as possible
  const refEmail = useRef();
  const refPassword = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const authAPI = new AuthAPI();

  useEffect(() => {
    refEmail.current.value = 'ncthanh1@gmail.com';
    refPassword.current.value = '123456';
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = refEmail.current.value;
    const password = refPassword.current.value;
    authAPI.login({
      email,
      password
    }, dispatch)
  }

  console.log(user);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">Lamasocial</h3>
          <span className="login-desc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-box">
            <input ref={refEmail} required placeholder="Email" type="email" className="login-input" />
            <input ref={refPassword} required minLength="6" placeholder="Password" type="password" className="login-input" />
            <button type="submit" disabled={isFetching} className="login-button">
              {
                isFetching ? <CircularProgress color="white" size="20px" /> : 'Log In'
              }
            </button>
            <span className="login-forgot">Forgot Password?</span>
            <button className="login-register-button">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
