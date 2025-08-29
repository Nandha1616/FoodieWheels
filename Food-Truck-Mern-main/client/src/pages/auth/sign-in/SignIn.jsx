import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../services/apiServices";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { login } from "../../../app/slices/user/userSlice";
import useForms from "../../../hooks/useForms";
import axios from "axios";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  const { formData, handleChange, resetForm } = useForms({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutation for API call
  const { mutate } = useMutation({
    onMutate: () => toast.loading("Loading..."),
    mutationFn: (formData) => makeRequest("/auth/login", "POST", formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      toast.dismiss();

      if (data.success === true) {
        toast.success("Logged in successfully");
        dispatch(login(data));
        // Redirect based on user role
        const redirectPath =
          data.user.role === "user"
            ? "/user"
            : data.user.role === "vendor"
            ? "/vendor"
            : "/admin";
        navigate(redirectPath);
      }

    },
    onError: () => {
      toast.dismiss();
      toast.error("Login failed. Please try again.");
    }
  });

  const onSubmit = () => {
    mutate(formData); // Pass form data directly to mutate
  };

  return (
    <>
      <Helmet>
        <title>Sign-In</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
            Sign In
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email format"
                  }
                })}
                name="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                // {...register("password", {
                //   required: "Password is required",
                //   pattern: {
                //     value:
                //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                //     message:
                //       "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
                //   }
                // })}
                name="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg w-full"
              >
                {isSubmitting ? "Loading..." : "Sign In"}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-4">
              <Link to="/sign-up" className="text-green-600 hover:underline">
                Register now!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
