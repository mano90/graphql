import { Category, Product, Reviews } from "../db";

const { v4: uuid } = require("uuid");
export const Mutation = {
  addCategory: (
    parents: any,
    { input }: any,
    { categories }: { categories: Category[] }
  ) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    categories.push(newCategory);
    return newCategory;
  },

  addProduct: (
    parents: any,
    { input }: any,
    { products, categories }: { products: Product[]; categories: Category[] }
  ) => {
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    };

    const item = categories.find((item) => item.id == categoryId);
    if (item) {
      products.push(newProduct);
      return newProduct;
    } else {
      return null;
    }
  },

  addReview: (
    parents: any,
    { input }: any,
    { reviews, products }: { reviews: Reviews[]; products: Product[] }
  ) => {
    const { date, title, comment, rating, productId } = input;
    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    const item = products.find((product) => product.id === productId);
    if (item) {
      reviews.push(newReview);
      return newReview;
    } else {
      return null;
    }
  },

  updateCategory: (
    parents: any,
    { id, input }: any,
    { categories }: { categories: Category[] }
  ) => {
    const { name } = input;
    const index = categories.findIndex((item) => item.id === id);
    if (index !== -1) {
      categories[index] = {
        id: categories[index].id,
        name,
      };
      return categories[index];
    } else {
      return null;
    }
  },

  updateProduct: (
    parents: any,
    { id, input }: any,
    { products, categories }: { products: Product[]; categories: Category[] }
  ) => {
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const index = categories.findIndex((item) => item.id == categoryId);
    if (index !== -1) {
      const newProduct = {
        name,
        description,
        quantity,
        price,
        image,
        onSale,
        categoryId,
      };
      products[index] = {
        ...products[index],
        ...newProduct,
      };
      return products[index];
    } else {
      return null;
    }
  },

  updateReview: (
    parents: any,
    { id, input }: any,
    { reviews, products }: { reviews: Reviews[]; products: Product[] }
  ) => {
    const { date, title, comment, rating, productId } = input;
    const updatedReview = {
      date,
      title,
      comment,
      rating,
      productId,
    };
    const indexProduit = products.findIndex(
      (product) => product.id === productId
    );
    const index = reviews.findIndex((produit) => produit.id === id);

    if (index !== -1) {
      reviews[index] = {
        id,
        ...updatedReview,
      };
      return updatedReview;
    } else {
      return null;
    }
  },
};
