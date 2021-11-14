import { Product } from "./product.type";
import { v4 as uuid } from 'uuid';

const products: Product[] = [
  {
    id: uuid(),
    label: "Tin of beans",

    price: 0.5,
    discounts: [
      {
        description: "Three tins of beans for the price of two!",
        price: 1.0,
        quantity: 3,
      },
    ],
  },
  {
    id: uuid(),
    label: "Can of cola",
    price: 0.7,
    discounts: [
      {
        description: "Two cans of cola for £1",
        price: 1.0,
        quantity: 2,
      }
    ],
  },
  {
    id: uuid(),
    label: "Oranges",
    price: 1.99,
    weight: 1
  },
];

const getProducts = () => {
    return products;
};


export { getProducts };