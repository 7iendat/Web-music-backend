import express from "express";

let configViewEngine = (app) => {
  app.use(express.static("public/images"));
  app.set("view engine", "ejs"); // set up ejs as the view
  app.set("views", "./src/views");
};

export default configViewEngine;
