import { SnackbarProvider } from "notistack";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Basket from "./basket/Basket";
import Container from "./components/Container";
import Products from "./product/Products";
import { SupermarketProvider } from "./supermarket/SupermarkertProvider";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider
        autoHideDuration={2500}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        maxSnack={3}
      >
        <Container>
          <SupermarketProvider>
            <Switch>
              <Route path="/" exact>
                <Products />
              </Route>
              <Route path="/basket">
                <Basket />
              </Route>
            </Switch>
          </SupermarketProvider>
        </Container>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
