import { Request, Response } from "express";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";
import { products, categories, reviews } from "./db";
import { Query } from "./resolvers/QueryResolver";
import { Category } from "./resolvers/CategoryResolver";
import { Product } from "./resolvers/ProductResolver";
import { Mutation } from "./resolvers/MutationResolver";

interface MyContext {
  authScope?: String;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
    Mutation,
  },
});

startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    categories,
    products,
    reviews,
  }),
}).then((url) => {
  console.log(`🚀 Server ready at`);
  console.log(url);
});

app.listen(8000);
