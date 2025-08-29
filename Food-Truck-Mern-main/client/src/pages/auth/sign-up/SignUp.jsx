import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../services/apiServices";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import useForms from "../../../hooks/useForms";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  const {formData,handleChange,resetForm} = useForms({ name: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    onMutate: () => toast.loading("Loading..."),
    mutationFn: (data) => makeRequest("/user", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.dismiss();
      toast.success("Registered successfully");
      
      
      navigate("/sign-in");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Error during registration");
    }
  });

  const onSubmit = () => {
    mutate(formData);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const inputClass = (fieldError) =>
    `w-full p-2 border rounded-md ${
      fieldError ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <>
      <Helmet>
        <title>Sign-Up</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg"
          data-aos="fade-up"
        >
          <h1 className="text-center text-3xl font-semibold text-green-600 mb-6">
            Register
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                {...register("name", {
                  required: "Name is required",
                  validate: (value) =>
                    value[0].toUpperCase() === value[0]
                      ? true
                      : "First letter should be capital"
                })}
                className={inputClass(errors.name)}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email Id
              </label>
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email format"
                  }
                })}

                className={inputClass(errors.email)}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be exactly 10 digits"
                  }
                })}
                className={inputClass(errors.phone)}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                    message:
                      "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
                  }
                })}
                className={inputClass(errors.password)}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>

            <div className="text-center mt-4">
              <Link
                to="/sign-in"
                className="text-blue-500 text-sm hover:underline"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
