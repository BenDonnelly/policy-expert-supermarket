import { ShoppingBasket } from "@material-ui/icons";
import { Box, colors, Grid, Stack, Typography } from "@mui/material";
import { useSupermarket } from "../supermarket/SupermarkertProvider";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
const Products = () => {
  const supermarket = useSupermarket();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" flexGrow={1}>
        <Typography variant="h5">Products</Typography>
        {supermarket.basket.length > 0 && (
          <Stack direction="row" gap={1}>
            <Typography
              component={Link}
              to="/basket"
              color={colors.blue[700]}
              variant="subtitle1"
            >
              Checkout
            </Typography>
            <ShoppingBasket />
          </Stack>
        )}
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {supermarket.products.map((product, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Products;
