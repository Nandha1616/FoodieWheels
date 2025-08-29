import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(() => ({
  border: "1px solid #cccccc",
  display: "grid",
  placeItems: "center",
  marginTop: "20px",
  paddingBottom: "20px",
  borderRadius: "5px"
}));

const StyledPaper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1)
}));

export default function FormLayout({ children, event = () => {}, heading }) {
  return (
    <>
      <section>
        {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto m-28  md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {heading}
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={event}
              >
                {children}
              </form>
            </div>
          </div>
        </div> */}
        <StyledContainer component="main" maxWidth="xs" className="bg-white">
          <CssBaseline />
          <StyledPaper>
            <StyledAvatar aria-label="user-avatar">
              {/* Add an icon or initials here if needed */}
            </StyledAvatar>
            <Typography component="h1" variant="h5">
              {heading}
            </Typography>
            <StyledForm noValidate onSubmit={event}>
              {children} {/* Render children passed into the form */}
            </StyledForm>
          </StyledPaper>
        </StyledContainer>
      </section>
    </>
  );
}

// PropTypes for validation
FormLayout.propTypes = {
  children: PropTypes.node, // Allows any renderable React content
  event: PropTypes.func, // Ensures the event prop is a function
  heading: PropTypes.string
};
