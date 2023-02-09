import { buildSchema } from "graphql";

export const typeDefs = buildSchema(`
  type Query {
    fruits: [String],
    ages: [Int],
    prices: [Float],
    maried: [Boolean],
    products(filter: ProductFilterInput): [Product!],
    product(id: ID!): Product,
    categories: [Category!]!,
    categorie(id: ID!): Category
  }
  type Product{
    id: ID!
    name: String!,
    description: String!,
    quantity: Int,
    price: Float!,
    image: String!,
    onSale: Boolean!,
    category: Category!,
    reviews: [Review!]!
  }
  type Mutation{
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product
    addReview(input: AddReviewInput!): Review
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    updateReview(id: ID!, input: UpdateReviewInput!): Review

  }

  type Category{
    id: ID!,
    name: String!,
    products(filter: ProductFilterInput): [Product!]!
  }
  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }
  input ProductFilterInput{
    onSale: Boolean,
    avgRating: Int
  }

  input AddCategoryInput{
    name: String!
  }

  input AddProductInput{
    name: String!,
    description: String!,
    quantity: Int,
    price: Float!,
    image: String!,
    onSale: Boolean!,
    categoryId: String!,
  }

  input AddReviewInput{
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  input UpdateCategoryInput{
    name: String!
  }

  input UpdateProductInput{
    name: String!,
    description: String!,
    quantity: Int,
    price: Float!,
    image: String!,
    onSale: Boolean!,
    categoryId: String!,
  }

  input UpdateReviewInput{
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

`);
