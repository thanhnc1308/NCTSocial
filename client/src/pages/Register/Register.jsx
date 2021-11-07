import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router';
import AuthAPI from "../../api/AuthAPI";
import "./register.scss";
import { Log } from '../../utils/Log';

export default function Register() {
  const authAPI = new AuthAPI();
  const refUsername = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refPasswordAgain = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    refUsername.current.value = 'ncthanh';
    refEmail.current.value = 'ncthanh@gmail.com';
    refPassword.current.value = '123456';
    refPasswordAgain.current.value = '123456';
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (refPassword.current.value !== refPasswordAgain.current.value) {
      refPasswordAgain.current.setCustomValidity('Passwords do not match!');
    } else {
      try {
        const payload = {
          username: refUsername.current.value,
          email: refEmail.current.value,
          password: refPassword.current.value
        }
        const res = await authAPI.register(payload);
        if (res) {
          navigate('/login');
        }
      } catch (e) {
        Log.exception(e);
      }
    }
  }

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
            <input ref={refUsername} required placeholder="Username" className="login-input" />
            <input ref={refEmail} required type="email" placeholder="Email" className="login-input" />
            <input ref={refPassword} required type="password" placeholder="Password" className="login-input" />
            <input ref={refPasswordAgain} required type="password" placeholder="Password Again" className="login-input" />
            <button type="submit" className="login-button">Sign Up</button>
            <button className="login-register-button">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
