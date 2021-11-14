import { useSnackbar } from "notistack";
import { createContext, useContext, useMemo, useState } from "react";
import { getProducts } from "../product/getProducts";
import { Discount, Product } from "../product/product.type";
import { BasketItem, BasketItemPrice, Supermarket } from "./supermarket.type";

const SupermarketContext = createContext<Supermarket>(null);

const useSupermarket = () => useContext(SupermarketContext);

const SupermarketProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const products = useMemo(() => getProducts(), []);
  const [basketItems, setBasket] = useState<BasketItem[]>([]);

  function removeFromBasket(product: Product) {
    if(!basketItems.find(item => item.product.id === product.id)) {
        console.error(`Tried to remove product ${product.label} from the basket but product does not exist in basket`);
        return;
    }

    let items = basketItems.slice();

    items = items.filter(item => item.product.id !== product.id);

    setBasket(items);

    enqueueSnackbar(`${product.label} removed from the basket.`, { 
        variant: 'info'
    });
  }

  function addToBasket(product: Product, quantity?: number) {
    const items = basketItems.slice();

    // Check if item is already in the basket
    if (items.find((item) => item.product.id === product.id)) {
      updateItem(product, quantity);
      return;
    }

    // Add new item to the basket
    items.push({
      product,
      quantity: quantity ? quantity : 1,
    });

    setBasket(items);

    enqueueSnackbar(`${product.label} has been added to the basket.`, {
      variant: "success",
    });
  }

  function updateItem(product: Product, quantity?: number) {
    const items = basketItems.slice();
    const index = items.findIndex((item) => item.product.id === product.id);

    items[index].quantity = quantity ? quantity : items[index].quantity + 1;

    setBasket(items);

    enqueueSnackbar(`${product.label} has been been updated in the basket`, {
      variant: "info",
    });
  }

  function priceItem(item: BasketItem): BasketItemPrice {
    if(!item.product.discounts) {
        return calcualteStandardPrice(item.quantity, item.product)
    }

    const discountedPrices = item.product.discounts.map((discount) =>
      calculateDiscount(item.quantity, item.product, discount)
    );
    const cheapestPrice = discountedPrices.reduce((previousValue, currentValue) =>
      currentValue.cost < previousValue.cost ? currentValue : previousValue
    );

    return cheapestPrice
  }

  function calcualteStandardPrice(quantity: number, product: Product): BasketItemPrice {
    if(product.weight) {
        return {
            cost: (product.price / product.weight) * quantity,
            savings: 0
        }
    }

    return {
      cost: quantity * product.price,
      savings: 0,
    };
  }

  function calculateDiscount(quantity: number, product: Product, discount: Discount): BasketItemPrice {
      if(!product.discounts?.includes(discount)) {
          console.error(`Tried to calculate discount ${discount.description} but product ${product.label} is not eligible.`);
          return;
      }

      const discountedQuantity = Math.floor(quantity / discount.quantity);
      const discountedPrice = discount.price;
      const discountedSum = discountedPrice * discountedQuantity;
  
      const fullPriceQuantity = quantity % discount.quantity;
      const fullPrice = product.price;
      const fullPriceSum = fullPrice * fullPriceQuantity;
  
      const cost = fullPriceSum + discountedSum;
      const savings = (quantity * product.price) - cost;
  
      return {
          cost, 
          savings
      }
  }

  return (
    <SupermarketContext.Provider value={{ removeFromBasket, addToBasket, priceItem, products, basket: basketItems }}>
      {children}
    </SupermarketContext.Provider>
  );
};

export { SupermarketProvider, useSupermarket };
