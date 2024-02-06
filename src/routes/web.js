import express from "express";
import { deleteUser, getAllUser } from "../controllers/UserController.js";
import { showViewCreate } from "../controllers/UserController.js";
import { createNewUser } from "../controllers/UserController.js";
import { showAllUser } from "../controllers/UserController.js";
import { updateUser } from "../controllers/UserController.js";

let router = express.Router();

let initRouters = (app) => {
  router.get("/get-all-user", getAllUser);
  router.get("/show-all-user", showAllUser);
  router.get("/show-view-create-user", showViewCreate);
  router.post("/create-new-user", createNewUser);
  router.put("/update-user", updateUser);
  router.delete("/delete-user", deleteUser);
  return app.use("/api", router);
};

export default initRouters;
