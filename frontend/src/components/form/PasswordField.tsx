import React, {useState} from "react";
import {Eye, EyeOff, Lock} from "lucide-react";
import "./Fields.css";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({id, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-group">
      <Lock size={18} className="input-icon"/>

      <input
        {...props}
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder || "••••••••••••"}
        className={`with-icon ${props.className || ""}`}
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
  );
};

export default PasswordField;