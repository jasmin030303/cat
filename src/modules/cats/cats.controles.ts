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

const postAllData = async (req: Request, res: Response) => {
  try {
    const { name, age, url,  color, sale, price,  } =
      req.body;

    const oneCat = await prisma.cats.findMany();

    if (!url || !name || !color ||  !price ) {
      return res.status(400).json({
        message: "Заполните поля!",
      });
    }

    if (
      oneCat.every(
        (el: any) =>
          el.name === name &&
          el.url === url &&
          el.color === color &&
          el.age === age &&
          el.price === price
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Такой кот уже сушествует в списке",
      });
    }

    const post = await prisma.cats.create({
      data: {
        name,
        age,
        url,
        color,
        sale,
        price,
      },
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in postAllData: ${error}`,
    });
  }
};

const deleteData = async (req: Request, res: Response) => {
  try {
    const { catsId } = req.params;
    const { name, age,  url, } = req.body;
    const num = await prisma.cats.delete({
      where: { id: catsId },
    });

    res.status(200).json({
      success: true,
      data: num,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Error in deleteData: ${error}`,
    });
  }
};

const patchData = async (req: Request, res: Response) => {
  try {
    const { catsId } = req.params;
    const { name, age, url,  color, price, sale } = req.body;
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
    const { name, age, url,  color, price, sale } = req.body;
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
  deleteData,
  patchData,
  upDateData,
};
