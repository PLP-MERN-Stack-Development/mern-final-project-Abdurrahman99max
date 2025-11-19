// client/src/utils/currency.js
export const getCurrencySymbol = (currencyCode) => {
  if (!currencyCode) return "";
  switch (currencyCode.toUpperCase()) {
    case "NGN":
      return "₦";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "";
  }
};

export const formatCurrency = (value, currencyCode = "NGN") => {
  const symbol = getCurrencySymbol(currencyCode);
  const num =
    typeof value === "number"
      ? value
      : value
      ? Number(value)
      : 0;

  return `${symbol}${num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
};

