const { prisma } = require("../prisma/prisma.client");

const createExpence = async (req, res) => {
  try {
    const { price, type, date, description, autoId, place } = req.body;

    const expence = await prisma.expencess.create({
      data: {
        auto: {
          connect: {
            id: autoId,
          },
        },
        user: {
          connect: {
            id: req.user.id,
          },
        },
        price: Number(price),
        type,
        date,
        description,
        place,
      },
      include: {
        auto: true,
      },
    });

    res.status(200).json(expence);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

const editExpence = async (req, res) => {
  try {
    const { price, type, date, description, autoId } = req.body;
    const { id } = req.params;

    const expence = await prisma.expencess.findFirst({
      where: { id },
    });

    if (!expence) {
      return res.status(404).json({ message: "Не удалось найти расход" });
    }

    const updateedExpence = await prisma.expencess.update({
      where: {
        id,
      },
      data: {
        autoId: autoId || expence.autoId,
        price: Number(price) || expence.price,
        type: type || expence.price,
        date: date || expence.date,
        description: description || expence.description,
      },
      include: {
        auto: true,
      },
    });

    res.status(200).json(updateedExpence);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

const removeExpence = async (req, res) => {
  try {
    const { id } = req.params;

    const expence = await prisma.expencess.findFirst({
      where: { id },
    });

    if (!expence) {
      return res.status(404).json({ message: "Не удалось найти расход" });
    }

    await prisma.expencess.delete({ where: { id } });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getExpences = async (req, res) => {
  try {
    const expencess = await prisma.expencess.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        auto: true,
      },
    });

    res.status(200).json(expencess);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createExpence,
  editExpence,
  removeExpence,
  getExpences,
};
