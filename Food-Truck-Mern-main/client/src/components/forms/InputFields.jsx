// import PropTypes from 'prop-types';

// function FormFields({ label, type, name, placeholder, required, event=()=>{} ,value,options=[]}) {
//   return (
//     <div>
//       <label
//         htmlFor={name}
//         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         id={name}
//         value={value}
//         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder={placeholder}
//         required={required}
//         onChange={event}
//       />

//     </div>
//   );
// }

// FormFields.propTypes = {
//   label: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   required: PropTypes.bool.isRequired,
//   event: PropTypes.func.isRequired,
//   value:PropTypes.any,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string.isRequired, // Each option should have a `value`
//       label: PropTypes.string.isRequired, // Each option should have a `label`
//     })
//   ),
// };

// export default FormFields;

import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

export default function InputFields({
  required = false,
  name = "",
  type = "",
  label = "",
  event = () => {},
  autoFocus = false
}) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      name={name}
      label={label}
      type={type}
      id={name}
      autoFocus={autoFocus} // Use the autoFocus prop correctly
      onChange={event}
    />
  );
}

// PropTypes for validation
InputFields.propTypes = {
  required: PropTypes.bool, // Must be a boolean
  name: PropTypes.string, // Must be a string
  type: PropTypes.string.required,
  label: PropTypes.string, // Must be a string
  event: PropTypes.func, // Must be a function
  autoFocus: PropTypes.bool // Must be a boolean
};
