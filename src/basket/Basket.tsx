import { Store } from "@material-ui/icons";
import { Box, Stack, Typography, colors } from "@mui/material";
import { Link } from "react-router-dom";
import BasketTable from "./BasketTable";

const Basket = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" flexGrow={1}>
        <Typography variant="h5">Basket</Typography>
        <Stack direction="row" gap={1}>
          <Typography
            component={Link}
            to="/"
            color={colors.blue[700]}
            variant="subtitle1"
          >
            Back to products
          </Typography>
          <Store />
        </Stack>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <BasketTable />
      </Box>
    </Box>
  );
};

export default Basket;
