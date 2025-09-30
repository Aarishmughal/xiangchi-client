import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

type SignupFormInputs = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export default function SignUp({ API_URL }: { API_URL: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<SignupFormInputs>({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [errors, setErrors] = useState<Partial<SignupFormInputs>>({});

    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: Partial<SignupFormInputs> = {};

        if (!formData.username) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "At least 3 characters";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Min 8 characters";
        }

        if (!formData.passwordConfirm) {
            newErrors.passwordConfirm = "Please confirm your password";
        } else if (formData.password !== formData.passwordConfirm) {
            newErrors.passwordConfirm = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        field: keyof SignupFormInputs,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Replace with your actual API endpoint
            await axios.post(API_URL, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            // Handle successful signup
            toast.success("Account created successfully!");

            // Redirect to dashboard or login page
            navigate("/dashboard");
        } catch (error: unknown) {
            // Handle signup errors
            let errorMessage = "Signup failed. Please try again.";

            if (axios.isAxiosError(error)) {
                errorMessage =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    errorMessage;

                // If it's a validation error, display field-specific errors
                if (
                    error.response?.status === 400 &&
                    error.response?.data?.errors
                ) {
                    setErrors(error.response.data.errors);
                }
            }

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#fffbf2] shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) =>
                                handleInputChange("username", e.target.value)
                            }
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="Enter your username"
                            disabled={loading}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleInputChange("email", e.target.value)
                            }
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) =>
                                    handleInputChange(
                                        "password",
                                        e.target.value
                                    )
                                }
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none pr-10"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center"
                                onClick={() => setShowPassword((prev) => !prev)}
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <Eye size={18} />
                                ) : (
                                    <EyeOff size={18} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.passwordConfirm}
                                onChange={(e) =>
                                    handleInputChange(
                                        "passwordConfirm",
                                        e.target.value
                                    )
                                }
                                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none pr-10"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                disabled={loading}
                            >
                                {showConfirmPassword ? (
                                    <Eye size={18} />
                                ) : (
                                    <EyeOff size={18} />
                                )}
                            </button>
                        </div>
                        {errors.passwordConfirm && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.passwordConfirm}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-600 hover:underline">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
