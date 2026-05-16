import {Link} from "react-router-dom";
import {Mail, User} from "lucide-react";
import InputField from "../../../components/form/InputField.tsx";
import PasswordField from "../../../components/form/PasswordField.tsx";
import type {RegisterFormData} from "./useRegistration";
import React from "react";

interface Props {
  formData: RegisterFormData,
  isLoading: boolean,
  error: string | null,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

const RegistrationForm = ({formData, isLoading, error, onChange, onSubmit}: Props) => (
  <form className="register-form" onSubmit={onSubmit}>
    <h2 className="register-title">Create account</h2>

    {error && <p className="register-error">{error}</p>}

    <InputField
      label="Username"
      id="username"
      name="username"
      icon={User}
      placeholder="Enter your username"
      value={formData.username}
      onChange={onChange}
      required
    />

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
      value={formData.password}
      onChange={onChange}
      required
    />

    <PasswordField
      id="confirmPassword"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={onChange}
      required
    />

    <div className="register-terms">
      <input
        type="checkbox"
        id="terms"
        name="agreeTerms"
        checked={formData.agreeTerms}
        onChange={onChange}
        required
      />
      <label htmlFor="terms">
        I agree to the <Link to="/about/terms">terms</Link>
      </label>
    </div>

    <button type="submit" className="register-button" disabled={isLoading}>
      {isLoading ? "Creating Account" : "Register"}
    </button>

    <div className="register-login">
      Already have an account ? <Link to="/login">Login here</Link>
    </div>
  </form>
);

export default RegistrationForm;