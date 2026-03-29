import type {ChangeEvent, ElementType} from "react";

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
                      label,
                      id,
                      name,
                      type = "text",
                      placeholder,
                      value,
                      onChange,
                      icon: Icon,
                      required = false
                    }: InputFieldProps) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>
        {Icon && <Icon size={18} className="icon"/>} {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;