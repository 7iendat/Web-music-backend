import prisma from "../../prisma/prismaDB.js";
import multer from "multer";
import { handleCreateSong } from "../services/songService.js";

export const showViewCreateSong = (req, res) => {
  return res.render("crudSong.ejs");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/music");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
}).single("file");

export const createNewSong = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("A Multer error occurred when uploading.");
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("An unknown error occurred when uploading.");
    }

    console.log(req.body);
    let result = await handleCreateSong(req.body);
    console.log(result);
    if (result.statusCode === 0) {
      return res.status(201).json({
        message: "song already created",
        user: result.user,
      });
    } else {
      return res.status(500).json({
        message: "something wrong",
      });
    }
  });
};
