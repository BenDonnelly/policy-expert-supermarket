import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardActions, Button, colors, TextField } from "@mui/material";
import { useSupermarket } from "../supermarket/SupermarkertProvider";
import formatCurrency from "../utils/formatCurrency";
import { Product } from "./product.type";

const ProductCard = ({ product }: { product: Product }) => {
  const supermarket = useSupermarket();

  // For more complex forms, I typically use Formik to handle forms
  // https://formik.org/
  const [weight, setWeight] = useState('');
  const [invalid, setInvalid] = useState(true);

  function addToBasket() {
    supermarket.addToBasket(product, weight ? Number(weight) : null)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setWeight(event.target.value);
  };

  useEffect(() => {
    const invalid = weight != '' && !Boolean(Number(weight)) 
    
    setInvalid(invalid)
  }, [weight])

  return (
    <Card
      sx={{
        minWidth: 275,
        height: 215,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: colors.grey[200],
      }}
    >
      <CardContent>
        <Typography variant="h5">{product.label}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {formatCurrency(product.price)}
          {product.weight && <span>/kg</span>}
        </Typography>
        {product.discounts && product.discounts.length > 0 && (
          <>
            <Typography variant="subtitle1">Available discounts:</Typography>
            {product.discounts.map((discount, index) => (
              <Typography variant="body2" key={index}>
                {discount.description}
              </Typography>
            ))}
          </>
        )}
        {product.weight && (
          <TextField
            label="Weight (Kg)"
            variant="outlined"
            error={invalid}
            helperText={invalid ? "invalid input - enter numbers only and greater than 0." : null}
            value={weight}
            onChange={handleChange}
          />
        )}
      </CardContent>
      <CardActions style={{ bottom: 0 }}>
        <Button disabled={invalid || (product.weight && !weight)} onClick={addToBasket} size="small">
          Add to basket
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
