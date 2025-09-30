import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function Login({ API_URL }: { API_URL: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<LoginFormInputs>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<LoginFormInputs>>({});

    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginFormInputs> = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof LoginFormInputs, value: string) => {
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
            await axios.post(
                API_URL,
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Handle successful login
            toast.success("Login successful!");

            // Redirect to dashboard or home page
            navigate("/play/home");
        } catch (error: unknown) {
            // Handle login errors
            let errorMessage = "Login failed. Please try again.";

            if (axios.isAxiosError(error)) {
                errorMessage =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    errorMessage;

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
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Log In
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleInputChange("email", e.target.value)
                            }
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            placeholder="you@gmail.com"
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Sign In"}
                    </button>
                </form>

                {errors.password && (
                    <p className="text-red-600 mt-2 text-center">
                        {errors.password}
                    </p>
                )}

                <div className="text-center mt-4 text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-red-600 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
