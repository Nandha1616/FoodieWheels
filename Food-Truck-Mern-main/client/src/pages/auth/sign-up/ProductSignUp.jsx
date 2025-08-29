import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../../services/apiServices";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useForms from "../../../hooks/useForms";

export default function ProductSignUp() {
  const { formData, handleChange, updateField } = useForms({
    shopName: "",
    phone: "",
    description: "",
    address: { location: "", city: "", state: "", zip: "" },
    startTime: "",
    endTime: "",
    price: "",
    shopImage: null,
    menuImage: null
  });

  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data) =>
      makeRequest(
        `/product/create/${userInfo.user.id}`,
        "POST",
        data,
        {},
        userInfo?.token || ""
      ),
    onSuccess: () => {
      toast.success("Product Registered successfully");
      navigate(userInfo.user.role === "admin" ? "/admin" : "/vendor");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to register product."
      );
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("shopName", formData.shopName);
    form.append("phone", formData.phone);
    form.append("description", formData.description);
    form.append("address", JSON.stringify(formData.address));
    form.append("startTime", formData.startTime);
    form.append("endTime", formData.endTime);
    form.append("price", formData.price);
    form.append("shopImage", formData.shopImage); // Validated file
    form.append("menuImage", formData.menuImage); // Validated file

    mutate(form);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB!");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed!");
        return;
      }
      updateField(e.target.name, file); // Save the valid file
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl p-6 bg-white rounded-lg shadow overflow-y-auto"
    >
      <div className="space-y-12">
        {/* Shop Information */}
        {/* Section 1: Shop Info */}
        <div className="border-b border-gray-300 pb-12">
          <h2 className="text-lg font-semibold text-green-600">
            Shop Information
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label
                htmlFor="shopName"
                className="block text-sm font-medium text-gray-900"
              >
                Shop Name
              </label>
              <div className="mt-2">
                <input
                  id="shopName"
                  name="shopName"
                  type="text"
                  value={formData.shopName}
                  autoComplete="shopName"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900"
              >
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={formData.phone}
                  autoComplete="phone"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <textarea
                  id="address"
                  name="address.location"
                  value={formData.address.location}
                  rows={1}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) =>
                    updateField("address", {
                      ...formData.address,
                      location: e.target.value
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Location Info */}
        <div className="border-b border-gray-300 pb-12">
          <h2 className="text-lg font-semibold text-gray-700">
            Location Information
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            <div>
              <label
                htmlFor="address.city"
                className="block text-sm font-medium text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="address.city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.address.city}
                  onChange={(e) =>
                    updateField("address", {
                      ...formData.address,
                      city: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  name="address.state"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.address.state}
                  onChange={(e) =>
                    updateField("address", {
                      ...formData.address,
                      state: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address.zip"
                className="block text-sm font-medium text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="zip"
                  name="address.zip"
                  type="text"
                  autoComplete="zip"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.address.zip}
                  onChange={(e) =>
                    updateField("address", {
                      ...formData.address,
                      zip: e.target.value
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-900"
              >
                Start Time
              </label>
              <div className="mt-2">
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.address.startTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-900"
              >
                End Time
              </label>
              <div className="mt-2">
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.address.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Upload Images */}

        {/* Upload Images */}
        <div className="border-b border-gray-300 pb-12">
          <h2 className="text-lg font-semibold text-gray-700">Upload Images</h2>
          <div className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="shopImage" className="block text-sm font-medium">
                Shop Image
              </label>
              <input
                id="shopImage"
                name="shopImage"
                className="border border-gray-400 p-2 rounded"
                type="file"
                onChange={handleFileChange} // File validation
              />
            </div>
            <div>
              <label htmlFor="menuImage" className="block text-sm font-medium">
                Menu Image
              </label>
              <input
                id="menuImage"
                name="menuImage"
                className="border border-gray-400 p-2 rounded"
                type="file"
                onChange={handleFileChange} // File validation
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
// import React, { useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { makeRequest } from "../../../services/apiServices";
// import toast from "react-hot-toast";
// import { Helmet } from "react-helmet";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import useForms from "../../../hooks/useForms";

// import { PhotoIcon } from "@heroicons/react/24/solid";
// import { useSelector } from "react-redux";

// export default function ProductSignUp() {
//   const { formData, handleChange, updateField } = useForms({
//     shopName: "",
//     phone: "",
//     description: "",
//     address: { location: "", city: "", state: "", zip: "" },
//     startTime: "",
//     endTime: "",
//     price: "",
//     shopImage: "",
//     menuImage: ""
//   });
//   const { isLoggedIn, userInfo } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const { mutate } = useMutation({
//     mutationFn: (data) =>
//       makeRequest(`/product/create/${userInfo.user.id}`, "POST", data),
//     onSuccess: () => {
//       toast.dismiss();
//       toast.success("Product Registered successfully");
//       navigate(userInfo.user.role === "admin" ? "/admin" : "/vendor");
//     },
//     onError: (error) => {
//       // Optional: Handle API errors more gracefully
//       toast.error(
//         error.response?.data?.message || "Failed to register product."
//       );
//     }
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = new FormData();

//     form.append("shopName", formData.shopName);
//     form.append("phone", formData.phone);
//     form.append("description", formData.description);
//     form.append("address", JSON.stringify(formData.address));
//     form.append("startTime", formData.startTime);
//     form.append("endTime", formData.endTime);
//     form.append("price", formData.price);
//     form.append("shopImage", formData.shopImage);
//     form.append("menuImage", formData.menuImage);

//     mutate(form);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-green-700 overflow-y-auto "
//     >
//       <div className="space-y-12">
//         {/* Section 1: Shop Info */}
//         <div className="border-b border-gray-300 pb-12">
//           <h2 className="text-lg font-semibold text-green-600">
//             Shop Information
//           </h2>
//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="shopName"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Shop Name
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="shopName"
//                   name="shopName"
//                   type="text"
//                   value={formData.shopName}
//                   autoComplete="shopName"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Phone
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="number"
//                   value={formData.phone}
//                   autoComplete="phone"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-3">
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Description
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   rows={3}
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-3">
//               <label
//                 htmlFor="address"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Address
//               </label>
//               <div className="mt-2">
//                 <textarea
//                   id="address"
//                   name="address.location"
//                   value={formData.address.location}
//                   rows={1}
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   onChange={(e) =>
//                     updateField("address", {
//                       ...formData.address,
//                       location: e.target.value
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Section 2: Location Info */}
//         <div className="border-b border-gray-300 pb-12">
//           <h2 className="text-lg font-semibold text-gray-700">
//             Location Information
//           </h2>
//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
//             <div>
//               <label
//                 htmlFor="address.city"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 City
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="city"
//                   name="address.city"
//                   type="text"
//                   autoComplete="address-level2"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   value={formData.address.city}
//                   onChange={(e) =>
//                     updateField("address", {
//                       ...formData.address,
//                       city: e.target.value
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="state"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 State / Province
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="state"
//                   name="address.state"
//                   type="text"
//                   autoComplete="address-level1"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   value={formData.address.state}
//                   onChange={(e) =>
//                     updateField("address", {
//                       ...formData.address,
//                       state: e.target.value
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="address.zip"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 ZIP / Postal code
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="zip"
//                   name="address.zip"
//                   type="text"
//                   autoComplete="zip"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   value={formData.address.zip}
//                   onChange={(e) =>
//                     updateField("address", {
//                       ...formData.address,
//                       zip: e.target.value
//                     })
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
//             <div>
//               <label
//                 htmlFor="city"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Start Time
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="startTime"
//                   name="startTime"
//                   type="time"
//                   autoComplete="address-level2"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   value={formData.address.startTime}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="endTime"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 End Time
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="endTime"
//                   name="endTime"
//                   type="time"
//                   autoComplete="address-level1"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   value={formData.address.endTime}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="price"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Price
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="price"
//                   name="price"
//                   type="number"
//                   autoComplete="address-level1"
//                   className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   value={formData.price}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Section 3: Upload Images */}

//         <div className="border-b border-gray-300 pb-12">
//           <h2 className="text-lg font-semibold text-gray-700">Upload Images</h2>
//           <div className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-2">
//             <div>
//               <label
//                 htmlFor="shopImage"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Shop Image
//               </label>
//               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
//                 <div className="text-center">
//                   <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
//                   <div className="mt-4 flex text-sm text-gray-600">
//                     <label
//                       htmlFor="shopImage"
//                       className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
//                     >
//                       <span>Upload a file</span>
//                       <input
//                         id="shopImage"
//                         name="shopImage"
//                         type="file"
//                         className="sr-only"
//                         onChange={(e) =>
//                           handleChange({
//                             target: {
//                               name: "shopImage",
//                               type: "file",
//                               files: e.target.files
//                             }
//                           })
//                         }
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     PNG, JPG, GIF up to 10MB
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="menuImage"
//                 className="block text-sm font-medium text-gray-900"
//               >
//                 Menu Image
//               </label>
//               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
//                 <div className="text-center">
//                   <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
//                   <div className="mt-4 flex text-sm text-gray-600">
//                     <label
//                       htmlFor="menuImage"
//                       className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
//                     >
//                       <span>Upload a file</span>
//                       <input
//                         id="menuImage"
//                         name="menuImage"
//                         type="file"
//                         className="sr-only"
//                         onChange={(e) =>
//                           handleChange({
//                             target: {
//                               name: "menuImage",
//                               type: "file",
//                               files: e.target.files
//                             }
//                           })
//                         }
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     PNG, JPG, GIF up to 10MB
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-6 flex items-center justify-end gap-x-6">
//           <button
//             type="button"
//             className="text-sm font-medium text-red-900 hover:text-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }
