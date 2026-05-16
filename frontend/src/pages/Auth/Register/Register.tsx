import PublicLayout from "../../../components/layout/PublicLayout";
import RegistrationForm from "./RegistrationForm";
import {useRegistration} from "./useRegistration";
import "./Register.css";

const Register = () => {
  const {formData, isLoading, error, handleChange, handleSubmit} = useRegistration();

  return (
    <PublicLayout>
      <div className="register-container">
        <RegistrationForm
          formData={formData}
          isLoading={isLoading}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </PublicLayout>
  );
};

export default Register;