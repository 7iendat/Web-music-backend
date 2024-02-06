import express from "express";
import bodyParser from "body-parser";
import initRouters from "./src/routes/web.js";
import viewEngine from "./config/viewEngine.js";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initRouters(app);

let PORT = 9999;

app.listen(PORT, () => {
  console.log("Success");
});
