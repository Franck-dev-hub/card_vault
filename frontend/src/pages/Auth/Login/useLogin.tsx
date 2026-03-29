import {useState, type ChangeEvent, type FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.tsx";

export const useLogin = () => {
  const [formData, setFormData] = useState({email: "", password: "", remember_me: false});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {checkAuth} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        remember_me: formData.remember_me,
      };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      const HTTP_ERRORS: Record<number, string> = {
        400: "Invalid information provided. Please check your inputs.",
      };

      if (!response.ok) {
        const message = HTTP_ERRORS[response.status] ?? data.message ?? "Login failed.";
        throw new Error(message);
      } else {
        await checkAuth();
        navigate("/dashboard");
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return {formData, isLoading, error, handleChange, handleSubmit};
};