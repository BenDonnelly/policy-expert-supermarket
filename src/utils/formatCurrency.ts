const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const formatCurrency = (value: number) => {
  return formatter.format(value);
};

export default formatCurrency;
