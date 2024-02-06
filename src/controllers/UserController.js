import prisma from "../../prisma/prismaDB.js";
import { handleCreateUser } from "../services/userService.js";

import multer from "multer";

export let getAllUser = async (req, res) => {
  const users = await prisma.user.findMany();

  if (users) {
    return res.status(200).json({
      success: true,
      data: users,
      message: "Successful.",
    });
  } else {
    return res.status(404).json({
      success: false,
      data: null,
      message: "Not found user.",
    });
  }
};

export const showAllUser = async (req, res) => {
  const users = await prisma.user.findMany();

  return res.render("userHome.ejs", { data: JSON.stringify(users) });
};

export const showViewCreate = async (req, res) => {
  return res.render("crud.ejs");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
}).single("avatar");

export const createNewUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("A Multer error occurred when uploading.");
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("An unknown error occurred when uploading.");
    }

    let result = await handleCreateUser(req.body, req.file.originalname);

    if (result.statusCode === 0) {
      return res.status(201).json({
        message: "user already created",
        user: result.user,
      });
    } else {
      return res.status(500).json({
        message: "something wrong",
      });
    }
  });
};

export const updateUser = async (req, res) => {
  let id = req.params.id;
  let body = req.body;

  if (!ObjectID.isValid(id)) {
    return res.status(400).json({
      message: "Invalid User ID",
    });
  } else {
    let result = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        email: body.email,
        password: body.password
          ? bcryptjs.hashSync(body.password, 10)
          : undefined,
        name: body.name,
        avatar: body.avatar || "",
      },
    });

    if (result != 1) {
      return res.status(204).json({
        message: "updated success",
        user: body,
      });
    } else {
      return res.status(500).json({
        message: "server error",
      });
    }
  }
};

export const deleteUser = async (req, res) => {
  let id = req.params.id;
  let user = await prisma.user.findFirst({
    where: {
      _id: id,
    },
  });
  if (user) {
    if (user.id == id) {
      return res.status(404).json({
        message: "Not found user",
      });
    } else {
      let result = await prisma.user.delete({
        where: {
          email: user.email,
        },
      });
      if (result) {
        return res.status(204).json({
          message: "deleted user success",
        });
      } else {
        return res.status(500).json({
          message: "server error",
        });
      }
    }
  } else {
    return res.status(404).json({
      message: "Not found user",
    });
  }
};
