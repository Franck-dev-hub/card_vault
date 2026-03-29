import Layout from "../../../components/layout/Layout";
import RegistrationForm from "./RegistrationForm";
import {useRegistration} from "./useRegistration";
import "./Register.css";

const Register = () => {
  const {formData, isLoading, error, handleChange, handleSubmit} = useRegistration();

  return (
    <Layout>
      <div className="auth-container">
        <RegistrationForm
          formData={formData}
          isLoading={isLoading}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default Register;