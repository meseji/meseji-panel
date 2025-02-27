
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

function calculateOriginalPrice(finalPrice, discountPercentage) {
  // Convert discount percentage to a decimal
  const discountDecimal = discountPercentage / 100;
  // Calculate the original price using the formula
  const originalPrice = finalPrice / (1 - discountDecimal);
  return originalPrice;
}

export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
