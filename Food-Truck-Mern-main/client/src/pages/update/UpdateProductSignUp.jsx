import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../services/apiServices";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useProductCrud from "../../hooks/products/useProductCrud";

function TextInput({ id, label, register, errors, required = false }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...register(id, { required: required && `${label} is required` })}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 ${
          errors[id] ? "border-red-500" : ""
        }`}
      />
      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
}

export default function UpdateProductSignUp() {
  const { id } = useParams();
  const { useFetchProducts, updateProduct } = useProductCrud();
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { data: fetchedData } = useFetchProducts({ productId: id });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      shopName: "",
      phone: "",
      description: "",
      address: { location: "", city: "", state: "", zip: "" },
      startTime: "",
      endTime: "",
      price: "",
      shopImage: null,
      menuImage: null
    }
  });

  useEffect(() => {
    if (fetchedData?.data) {
      reset(fetchedData.data);
    }
  }, [fetchedData, reset]);

  const onSubmit = (data) => {
    // Initialize FormData instance
    const formData = new FormData();

    // Append all fields to FormData
    for (const key in data) {
      if (key === "address") {
        formData.append(key, JSON.stringify(data[key])); // Stringify address object
      } else if (["shopImage", "menuImage"].includes(key)) {
        if (data[key]?.[0]) {
          formData.append(key, data[key][0]); // Append file if it exists
        }
      } else {
        formData.append(key, data[key]); // Append other fields
      }
    }

    // Call the updateProduct function
    updateProduct({ productId: id, updateData: formData });
  };

  const previewImage = (file) => {
    try {
      return file?.length > 0 ? file : null;
    } catch (e) {
      console.error("Invalid file object:", e);
      return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-4xl p-8 bg-white rounded-lg shadow-md"
    >
      <div className="space-y-12">
        <Section title="Shop Information">
          <TextInput
            id="shopName"
            label="Shop Name"
            register={register}
            errors={errors}
            required
          />
          <TextInput
            id="phone"
            label="Phone"
            register={register}
            errors={errors}
            required
          />
        </Section>

        <Section title="Location Information">
          {["location", "city", "state", "zip"].map((field) => (
            <TextInput
              key={field}
              id={`address.${field}`}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              register={register}
              errors={errors?.address || {}}
              required
            />
          ))}
        </Section>

        <Section title="Operating Hours">
          <TextInput
            id="startTime"
            label="Start Time"
            register={register}
            errors={errors}
            required
          />
          <TextInput
            id="endTime"
            label="End Time"
            register={register}
            errors={errors}
            required
          />
        </Section>

        <Section title="Upload Images">
          {["shopImage", "menuImage"].map((field) => {
            return (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field === "shopImage" ? "Shop Image" : "Menu Image"}
                </label>
                <input
                  id={field}
                  type="file"
                  {...register(field)}
                  className="block w-full rounded-md border p-1 border-gray-400 shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                {watch(field)?.[0] && (
                  <img
                    src={previewImage(watch(field))}
                    alt="Preview"
                    className="mt-4 h-20 w-20 rounded-md border-gray-300"
                  />
                )}
              </div>
            );
          })}
        </Section>

        <div className="flex justify-end mt-8 space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            // disabled={useUpdateProduct.isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-b border-gray-300 pb-8">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}
