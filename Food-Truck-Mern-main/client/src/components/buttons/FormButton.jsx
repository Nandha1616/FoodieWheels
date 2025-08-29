
import PropTypes from "prop-types";

function FormButton({ type, label }) {
  return (
    <button
      type={type}
      className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {label}
    </button>
  );
}

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  event: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default FormButton;
