import { Product } from "../product/product.type";

type BasketItemPrice = {
  cost: number;
  savings: number;
}

type BasketItem = {
  product: Product;
  quantity: number;
};

type Supermarket = {
  products: Product[];
  basket: BasketItem[];
  removeFromBasket(product: Product): void;
  addToBasket(product: Product, quantity?: number): void;
  priceItem(item: BasketItem): BasketItemPrice;
};

export type { Supermarket, BasketItem, BasketItemPrice };
