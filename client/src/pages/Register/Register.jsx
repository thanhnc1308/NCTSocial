import "./register.scss";

export default function Register() {
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
          <div className="login-box">
            <input placeholder="Username" className="login-input" />
            <input placeholder="Email" className="login-input" />
            <input placeholder="Password" className="login-input" />
            <input placeholder="Password Again" className="login-input" />
            <button className="login-button">Sign Up</button>
            <button className="login-register-button">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
