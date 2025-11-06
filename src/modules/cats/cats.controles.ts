import { Request, Response } from "express";
import prisma from "../../config/prisma";

const getAllData = async (req: Request, res: Response) => {
  try {
    const user = await prisma.cats.findMany();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in getAllData: ${error}`,
    });
  }
};
console.log("hello");

const postAllData = async (req: Request, res: Response) => {
  try {
    const { name, age, url, color, sale, price } = req.body;

    const existingCat = await prisma.cats.findFirst({
      where: { name },
    });

    if (existingCat) {
      return res.status(400).json({
        success: false,
        message: "Такой кот уже существует в списке!",
      });
    }

    const newCat = await prisma.cats.create({
      data: { name, age, url, color, sale: Number(sale) || 0, price },
    });

    return res.status(201).json({
      success: true,
      data: newCat,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: `Error in postAllData: ${error}`,
    });
  }
};

const deleteCat = async (req: Request, res: Response) => {
  try {
    const { catsId } = req.body;

    if (!catsId) {
      return res.status(400).json({
        success: false,
        message: "Не передан catsId",
      });
    }

    const deleted = await prisma.cats.delete({
      where: { id: catsId },
    });

    res.status(200).json({
      success: true,
      message: "Кот успешно удалён",
      data: deleted,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Ошибка при удалении кота: ${error.message}`,
    });
  }
};

const patchData = async (req: Request, res: Response) => {
  try {
    const { catsId } = req.params;
    const { name, age, url, color, price, sale } = req.body;
    const index = await prisma.cats.update({
      where: { id: catsId },
      data: {
        name,
        age,
        url,
        color,
        price,
        sale,
      },
    });

    res.status(200).json({
      success: true,
      index,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при обнавлении данных: ${error}`,
    });
  }
};

const upDateData = async (req: Request, res: Response) => {
  try {
    const { catsId } = req.params;
    const { name, age, url, color, price, sale } = req.body;
    const index = await prisma.cats.update({
      where: { id: catsId },
      data: {
        name,
        age,
        url,
        color,
        price,
        sale,
      },
    });

    res.status(200).json({
      success: true,
      index,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Ошибка при обнавлении данных: ${error}`,
    });
  }
};

export default {
  getAllData,
  postAllData,
  deleteCat,
  patchData,
  upDateData,
};
