import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { LayoutProvider } from "../context/LayoutContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PropTypes from "prop-types";
import store from "../app/store";
const queryClient = new QueryClient();

function Providers({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired
};

export default Providers;
