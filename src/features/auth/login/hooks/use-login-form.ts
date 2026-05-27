import { useState } from "react";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
    general?: string;
  }>({});
  const [touched, setTouched] = useState<{
    identifier?: boolean;
    password?: boolean;
  }>({});

  const validateIdentifier = (value: string) => {
    if (!value.trim()) return "Required";
    if (value.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid format";
    }
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (!value) return "Required";
    if (value.length < 6) return "Minimum 6 characters";
    return undefined;
  };

  const handleInputChange = (field: "identifier" | "password", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = field === "identifier" 
        ? validateIdentifier(value) 
        : validatePassword(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
    
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  const handleBlur = (field: "identifier" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = formData[field];
    const error = field === "identifier" 
      ? validateIdentifier(value) 
      : validatePassword(value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const identifierError = validateIdentifier(formData.identifier);
    const passwordError = validatePassword(formData.password);
    
    setTouched({ identifier: true, password: true });
    setErrors({ identifier: identifierError, password: passwordError });
    
    if (identifierError || passwordError) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setErrors({ general: "Access denied" });
    setIsLoading(false);
  };

  const isFormValid = !validateIdentifier(formData.identifier) && !validatePassword(formData.password);

  return {
    formData,
    showPassword,
    setShowPassword,
    isLoading,
    errors,
    touched,
    handleInputChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  };
};
