import React, {useState, useCallback} from "react";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = e.target;
    setError(null);

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (formData.password.length < 12) {
      return setError("Password must be at least 12 characters.");
    }

    if (!formData.agreeTerms) {
      return setError("You must agree to the terms and conditions.");
    }

    setIsLoading(true);

    try {
      const payload = {
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      const HTTP_ERRORS: Record<number, string> = {
        400: "Invalid information provided. Please check your inputs.",
        409: "This username or email is already taken.",
        422: "Please fill in all required fields correctly.",
        429: "Too many attempts. Please try again later.",
        500: "Server error. Please try again later.",
      };

      if (!response.ok) {
        const message = HTTP_ERRORS[response.status] ?? data.message ?? "Registration failed.";
        throw new Error(message);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return {formData, isLoading, error, handleChange, handleSubmit};
};