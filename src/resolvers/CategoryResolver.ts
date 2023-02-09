import { Product } from "../db";

export const Category = {
  products: (
    { id: idCategory }: { id: string },
    { filter }: any,
    { products }: { products: Product[] }
  ) => {
    if (filter) {
      return products.filter(
        (item) =>
          item.categoryId === idCategory && item.onSale === filter.onSale
      );
    }
    return products.filter((item) => item.categoryId === idCategory);
  },
};
