type Product = {
  id: number;
  label: String;
  price: number;
  discounts?: Discount[];
  // Weight is measured in kilograms
  // In a real life scenario I would recommend expanding on the weight properties, perhaps a unit - grams and add a weight label to be displayed beside the product label
  weight?: number;
};


type Discount = {
    description: string
    price: number
    quantity: number
}

export type { Product, Discount };