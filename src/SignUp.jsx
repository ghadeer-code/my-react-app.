import './Components/LoginSignup.css';

export default function SignUp() {
  return (
    <div className="auth-container">
      {/* القسم البنفسجي الأيسر */}
      <div className="left-side">
        <h1>Get Started</h1>
        <p>Already have an account?</p>
        <button className="log-in-btn">Log In</button>
      </div>

      {/* القسم الأبيض الأيمن */}
      <div className="right-side">
        <div>
          <h2>Create Account</h2>
          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            
            <div className="input-group">
              <input id="name" type="text" placeholder="Username" />
            </div>

            <div className="input-group">
              <input id="email" type="email" placeholder="E-mail" />
            </div>

            <div className="input-group">
              <input id="password" type="password" placeholder="Password" />
            </div>

            <div className="input-group">
              <input id="Cpassword" type="password" placeholder="Confirm Password" />
            </div>

            {/* مربع شروط الاتفاقية */}
            <div className="checkbox-group">
              <input type="checkbox" id="agree" />
              <label htmlFor="agree">I accept the terms of the agreement</label>
            </div>

            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>

        {/* روابط أسفل الصفحة */}
        <div className="form-footer">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
