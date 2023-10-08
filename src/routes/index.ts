import express from "express";
import { AuthRouter } from "../app/modules/auth/auth.router";
import { UserRouter } from "../app/modules/users/users.router";
import { CategoryRouter } from "../app/modules/categories/categories.router";
import { BookRouter } from "../app/modules/books/books.router";
import { OrderRouter } from "../app/modules/orders/orders.router";
import { ProfileRouter } from "../app/modules/profile/profile.router";

const router = express.Router();

const routes = [
  { path: "/auth", module: AuthRouter },
  { path: "/users", module: UserRouter },
  { path: "/profile", module: ProfileRouter },
  { path: "/categories", module: CategoryRouter },
  { path: "/books", module: BookRouter },
  { path: "/orders", module: OrderRouter },
];

routes.forEach((route) => {
  router.use(route.path, route.module);
});

export const AppRouter = router;
