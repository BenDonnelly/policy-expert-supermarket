import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SupermarketProvider } from "../supermarket/SupermarkertProvider";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Container from "../components/Container";

const AllTheProviders: FC = ({ children }) => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Container>
          <SupermarketProvider>{children}</SupermarketProvider>;
        </Container>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });
  

export * from "@testing-library/react";
export { customRender as render };
