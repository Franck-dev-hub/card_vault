import {Link} from "react-router-dom";
import {Mail} from "lucide-react";
import InputField from "../../../components/form/InputField";
import PasswordField from "../../../components/form/PasswordField";
import React from "react";

interface LoginFormData {
  email: string;
  password: string;
  remember_me: boolean;
}

interface Props {
  formData: LoginFormData;
  isLoading: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({formData, isLoading, error, onChange, onSubmit}: Props) => (
  <form className="register-form" onSubmit={onSubmit}>
    <h2 className="register-title">Welcome back</h2>

    {error && <p className="register-error">{error}</p>}

    <InputField
      label="Email"
      id="email"
      name="email"
      type="email"
      icon={Mail}
      placeholder="Enter your email"
      value={formData.email}
      onChange={onChange}
      required
    />

    <PasswordField
      id="password"
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={onChange}
      required
    />

    <div className="login-remember">
      <div className="login-remember-box">
        <input
          type="checkbox"
          id="remember_me"
          name="remember_me"
          checked={formData.remember_me}
          onChange={onChange}
        />
        <label htmlFor="remember_me">Remember me</label>
      </div>

      <Link to="/forgot-password" className="login-forgot">
        Forgot password?
      </Link>
    </div>

    <button type="submit" className="login-button" disabled={isLoading}>
      {isLoading ? "Logging in" : "Login"}
    </button>

    <div className="login-register">
      Don't have an account ? <Link to="/register">Create one</Link>
    </div>
  </form>
);

export default LoginForm;