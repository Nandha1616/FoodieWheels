import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}));

export default function FormButton({ label }) {
  return (
    <StyledSubmitButton
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      // Attach the event handler
    >
      {label} {/* Use the label prop */}
    </StyledSubmitButton>
  );
}

// PropTypes for validation
FormButton.propTypes = {
  label: PropTypes.string.isRequired // Label must be a string and is required
  // Event must be a function
};
