import prisma from "../../prisma/prismaDB.js";

export const handleCreateSong = async (data) => {
  return new Promise(async (resolve, reject) => {
    if (!data) {
      resolve({
        statusCode: 1,
        message: "Missing parameter",
      });
    } else {
      try {
        let checkSong = await prisma.song.findFirst({
          where: {
            title: data.title,
          },
        });
        if (checkSong) {
          resolve({
            statusCode: 2,
            message: "Song existed",
          });
        } else {
          let user = await prisma.user.findFirst({
            where: {
              _id: data.singerId,
            },
            select: {
              id: true,
              email: true,
              name: true,
              avatar: true,
            },
          });

          console.log(user);

          let result = await prisma.song.create({
            data: {
              title: data.title,
              artist: data.artist,
              lyric: data.lyric,
              singerId: data.singerId,
              singer: {
                connect: {
                  id: user.id,
                },
              },
            },
          });

          if (result) {
            resolve({
              statusCode: 0,
              message: "created song successful",
              data: result,
            });
          } else {
            resolve({
              statusCode: 3,
              message: "error server",
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    }
  });
};
