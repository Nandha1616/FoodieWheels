import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import PropTypes from "prop-types";

function SelectFields({ name, event = () => {}, value, options = [], label }) {
  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        name={name}
        value={value}
        onChange={event}
        displayEmpty
        label={label}
      >
        {/* Default Placeholder */}
        <MenuItem value="" disabled>
         
        </MenuItem>

        {/* Render each option dynamically */}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectFields.propTypes = {
  name: PropTypes.string.isRequired, // `name` is required
  event: PropTypes.func, // `event` should be a function
  value: PropTypes.any, // `value` can be any type
  label: PropTypes.string, // `label` is optional, should be a string
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired, // Each option should have a `value`
      label: PropTypes.string.isRequired, // Each option should have a `label`
    })
  ).isRequired, // `options` is required and should be an array of objects
};

export default SelectFields;
