import { Category, Reviews } from "../db";

export const Product = {
  category: (
    { categoryId }: { categoryId: string },
    args: any,
    { categories }: { categories: Category[] }
  ) => {
    return categories.find((item: any) => item.id === categoryId);
  },
  reviews: (
    { id }: { id: string },
    args: string,
    { reviews }: { reviews: Reviews[] }
  ) => {
    // console.log(reviews);
    return reviews.filter((item) => item.productId == id);
  },
};
