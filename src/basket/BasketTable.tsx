import { Delete } from "@material-ui/icons";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSupermarket } from "../supermarket/SupermarkertProvider";
import formatCurrency from "../utils/formatCurrency";

const BasketTable = () => {
  const supermarket = useSupermarket();
  const [totals, setTotals] = useState({
    cost: 0,
    savings: 0,
  });

  useEffect(() => {
    if(supermarket.basket.length === 0) {
        setTotals({
            cost: 0,
            savings: 0
        })    
        return;
    }

    const totals = supermarket.basket
      .map((item) => {
        return supermarket.priceItem(item);
      })
      .reduce((previousValue, currentValue) => {
        return {
          cost: previousValue.cost + currentValue.cost,
          savings: previousValue.savings + currentValue.savings,
        };
      });

    setTotals({
      cost: totals.cost,
      savings: totals.savings,
    });
  }, [supermarket.basket]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Savings</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supermarket.basket.length === 0 && (
            <TableRow>
              <TableCell>No items added, head back to the products page to add some!</TableCell>
            </TableRow>
          )}
          {supermarket.basket.map((item, index) => {
            const price = supermarket.priceItem(item);
            console.log(price);
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.product.label}
                </TableCell>
                <TableCell align="right">
                  {item.quantity}
                  <Typography variant="caption">
                    {item.product.weight ? ` (${item.product.price}/kg)` : null}
                  </Typography>
                </TableCell>
                <TableCell align="right">{formatCurrency(price.savings)}</TableCell>
                <TableCell align="right">{formatCurrency(price.cost)}</TableCell>
                <TableCell align="right">
                  <Delete cursor="pointer" onClick={() => supermarket.removeFromBasket(item.product)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {supermarket.basket.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell align="right">
                <Typography variant="subtitle1" fontWeight={700}>
                  Total
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" fontWeight={700}>
                  {formatCurrency(totals.savings)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" fontWeight={700}>
                  {formatCurrency(totals.cost)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
