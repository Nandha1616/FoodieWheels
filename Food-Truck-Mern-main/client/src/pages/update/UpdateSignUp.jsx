import React, { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import useForms from "../../hooks/useForms";
import usePutData from "../../hooks/update/useUserCrud";

function UpdateSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  const { formData, handleChange, resetForm, setFormData } = useForms({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, isLoading, isError, updateUser } = usePutData(id);
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || ""
      }));
    }
  }, [userData]);

  const onSubmit = () => {
    updateUser({ id, updateData: formData });
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
                value={formData.name}
                // {...register("name", {
                //   required: "Name is required",
                //   validate: (value) =>
                //     value[0].toUpperCase() === value[0]
                //       ? true
                //       : "First letter should be capital"
                // })}
                className={inputClass()}
                onChange={handleChange}
              />
              {/* {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )} */}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email Id
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                // {...register("email", {
                //   required: "Email is required",
                //   pattern: {
                //     value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                //     message: "Invalid email format"
                //   }
                // })}
                className={inputClass()}
                onChange={handleChange}
              />
              {/* {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )} */}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                // {...register("phone", {
                //   required: "Phone number is required",
                //   pattern: {
                //     value: /^[0-9]{10}$/,
                //     message: "Phone number must be exactly 10 digits"
                //   }
                // })}
                className={inputClass()}
                value={formData.phone}
                onChange={handleChange}
              />
              {/* {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )} */}
            </div>

            {/* Password Field */}

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

export default UpdateSignUp;
