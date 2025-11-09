import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getFavorite = async (req: Request, res: Response) => {
  try {
    const {  userId } = req.body;


 if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Не передан userId",
      });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { cats: true },
    });


    res.status(200).json({
      success: true,
      favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при получения избранного ${error}`,
    });
  }
};

const postFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, catsId} = req.body;

    const findCat = await prisma.favorite.findFirst({
      where: { userId, catsId },
    });

    if (findCat) {
      return res.status(400).json({
        success: false,
        message: "Заполните поля!",
      });
    }

    const favorite = await prisma.favorite.create({
      data: { userId, catsId },
    });
   
    res.status(201).json({
      success: true,
      data: favorite,
      message:"Кот добавлен в избранное",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error:`Ошибка при добавлении в избранное: ${error}`,
    });
  }
};

const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, catsId } = req.body;

    const del = await prisma.favorite.deleteMany({
      where: { userId, catsId },
    });

    res.status(200).json({
      success: true,
      del
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при удалении из избранного: ${error}`,
    });
  }
};


export default {
  getFavorite,
  postFavorite,
  deleteFavorite,
  
};
