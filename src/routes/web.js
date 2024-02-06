import express from "express";
import { getAllUser } from "../controllers/UserController.js";
import { showViewCreate } from "../controllers/UserController.js";
import { createNewUser } from "../controllers/UserController.js";
import { showAllUser } from "../controllers/UserController.js";

let router = express.Router();

let initRouters = (app) => {
  router.get("/get-all-user", getAllUser);
  router.get("/show-all-user", showAllUser);
  router.get("/show-view-create-user", showViewCreate);
  router.post("/create-new-user", createNewUser);
  return app.use("/api", router);
};

export default initRouters;
