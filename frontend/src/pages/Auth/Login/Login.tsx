import Layout from "../../../components/layout/Layout";
import LoginForm from "./LoginForm";
import {useLogin} from "./useLogin";
import "./Login.css";

const Login = () => {
  const {formData, isLoading, error, handleChange, handleSubmit} = useLogin();

  return (
    <Layout>
      <div className="auth-container">
        <LoginForm
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

export default Login;