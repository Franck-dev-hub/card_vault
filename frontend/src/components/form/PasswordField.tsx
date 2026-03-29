import React, {useState} from "react";
import {Eye, EyeOff, Lock} from "lucide-react";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({label, id, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-group">
      <label htmlFor={id}>
        <Lock size={18} className="icon"/> {label}
      </label>
      <div className="input-wrapper">
        <input
          {...props}
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder || "••••••••••••"}
          className={props.className}
        />
        <button
          type="button"
          className="toggle-eye"
          onClick={toggleVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;