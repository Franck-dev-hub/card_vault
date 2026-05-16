import PublicLayout from "../../../components/layout/PublicLayout";
import LoginForm from "./LoginForm";
import {useLogin} from "./useLogin";
import "./Login.css";

const Login = () => {
  const {formData, isLoading, error, handleChange, handleSubmit} = useLogin();

  return (
    <PublicLayout>
      <div className="login-container">
        <LoginForm
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

export default Login;