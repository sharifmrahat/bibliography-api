import express from "express";
import { AuthRouter } from "../app/modules/auth/auth.router";
import { UserRouter } from "../app/modules/users/users.router";

const router = express.Router();

const routes = [
  { path: "/auth", module: AuthRouter },
  { path: "/users", module: UserRouter },
];

routes.forEach((route) => {
  router.use(route.path, route.module);
});

export const AppRouter = router;