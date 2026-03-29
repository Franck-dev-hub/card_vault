import type {ChangeEvent, ElementType} from "react";
import "./Fields.css";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ElementType;
  required?: boolean;
}

const InputField = ({
                      id, name, type = "text", placeholder, value, onChange, icon: Icon, required = false
                    }: InputFieldProps) => {
  return (
    <div className="input-group">
      {/* On place l'icône avant l'input dans le DOM */}
      {Icon && <Icon size={18} className="input-icon"/>}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={Icon ? "with-icon" : ""}
      />
    </div>
  );
};

export default InputField;