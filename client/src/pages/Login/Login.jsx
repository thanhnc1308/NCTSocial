import { useEffect, useRef } from "react";
import "./login.scss";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../../redux/authSlice";

export default function Login() {
  // we can use useState here but shouldn't
  // because it will re-render the page everytime we
  // change the input. We should prevent the re-rendering
  // as much as possible
  const refEmail = useRef();
  const refPassword = useRef();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  console.log(auth);

  useEffect(() => {
    refEmail.current.value = 'ncthanh1@gmail.com';
    refPassword.current.value = '123456';
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = refEmail.current.value;
    const password = refPassword.current.value;
    dispatch(login({
      email,
      password
    }));
  }

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">NCT</h3>
          <span className="login-desc">
            Connect with friends and the world around you on NCT.
          </span>
        </div>
        <div className="login-right">
          <form onSubmit={handleSubmit} className="login-box">
            <input ref={refEmail} required placeholder="Email" type="email" className="login-input" />
            <input ref={refPassword} required minLength="6" placeholder="Password" type="password" className="login-input" />
            <button type="submit" disabled={auth.loading} className="login-button">
              {
                auth.loading ? <CircularProgress size="20px" /> : 'Log In'
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
