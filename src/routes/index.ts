import express from "express";
import { AuthRouter } from "../app/modules/auth/auth.router";
import { UserRouter } from "../app/modules/users/users.router";
import { CategoryRouter } from "../app/modules/categories/categories.router";
import { BookRouter } from "../app/modules/books/books.router";

const router = express.Router();

const routes = [
  { path: "/auth", module: AuthRouter },
  { path: "/users", module: UserRouter },
  { path: "/categories", module: CategoryRouter },
  { path: "/books", module: BookRouter },
];

routes.forEach((route) => {
  router.use(route.path, route.module);
});

export const AppRouter = router;
