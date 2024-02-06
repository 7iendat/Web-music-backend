import prisma from "../../prisma/prismaDB.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const checkExistUser = async (email) => {
  if (!email) {
    return false;
  } else {
    let dataUser = await prisma.user.findFirst({ where: { email: email } });
    if (dataUser) {
      return true;
    } else {
      return false;
    }
  }
};

export const handleCreateUser = (data, filename) => {
  return new Promise(async (resolve, reject) => {
    let checkEmail = await checkExistUser(data.email);
    if (checkEmail) {
      resolve({
        statusCode: 1,
        message: "User  already exists",
      });
    } else {
      try {
        let hashPassword = await bcrypt.hash(data.password, saltRounds);

        let user = await prisma.user.create({
          data: {
            email: data.email,
            password: hashPassword,
            name: data.name,
            avatar: filename || "",
          },
        });

        if (user) {
          resolve({
            statusCode: 0,
            message: "create user success",
            user: user,
          });
        } else {
          resolve({
            statusCode: -1,
            message: "server error",
          });
        }
      } catch (error) {
        reject(error);
      }
    }
  });
};
