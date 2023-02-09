import { Category, Product, Reviews } from "../db";

export const Query = {
  fruits: () => ["banana", "apple", "pie"],
  ages: () => [1, 2, 3, 4],
  prices: () => [1.233, 4.4555, 2.77895, 5.1223],
  maried: () => [true, false, true, true, true],
  products: (
    parents: any,
    { filter }: any,
    { products, reviews }: { products: Product[]; reviews: Reviews[] }
  ) => {
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) products = products.filter((e) => e.onSale === filter.onSale);

      if (avgRating && [1, 2, 3, 4, 5].includes(avgRating)) {
        products = products.filter((product) => {
          let average: number = 0;
          let count: number = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              average += review.rating;
              count++;
            }
          });
          return average / count >= avgRating;
        });
      }
      return products;
    } else {
      return products;
    }
  },
  product: (
    parents: any,
    { id }: { id: string },
    { products }: { products: Product[] }
  ) => {
    const item = products.find((item) => item.id === id);
    return item;
  },
  categories: (
    parents: any,
    args: any,
    { categories }: { categories: Category[] }
  ) => categories,
  categorie: (
    parents: any,
    args: any,
    { categories: listeCategories }: { categories: Category[] }
  ) => {
    const { id } = args;
    return listeCategories.find((item) => item.id == args.id);
  },
};
