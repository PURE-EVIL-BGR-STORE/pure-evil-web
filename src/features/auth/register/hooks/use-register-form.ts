import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData> & { general?: string }>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});

  const validateField = (field: keyof typeof formData, value: string) => {
    if (!value.trim()) return "Required";
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Invalid format";
    }
    if (field === "password" && value.length < 6) return "Minimum 6 characters";
    return undefined;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
    if (errors.general) setErrors((prev) => ({ ...prev, general: undefined }));
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: typeof errors = {};
    let hasError = false;
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasError = true;
      }
      setTouched((prev) => ({ ...prev, [key]: true }));
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Call the nextjs api
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.error || "Registration failed" });
      } else {
        // Automatically route to home (or dashboard) since we auto-logged in
        router.push("/");
      }
    } catch (err) {
      setErrors({ general: "Network error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Object.keys(formData).every(
    (key) => !validateField(key as keyof typeof formData, formData[key as keyof typeof formData])
  );

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
