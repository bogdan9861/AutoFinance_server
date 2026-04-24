const { prisma } = require("../prisma/prisma.client");

const createMaintance = async (req, res) => {
  try {
    const {
      price,
      type,
      date,
      nextMaintanceMillageKM,
      status,
      place,
      description,
      masterName,
      autoId,
    } = req.body;

    await prisma.$transaction(
      async (params) => {
        const car = await prisma.auto.findFirst({
          where: {
            id: autoId,
          },
        });

        await prisma.auto.update({
          where: {
            id: autoId,
          },
          data: {
            distanceCovered: 0,
          },
        });

        const maintance = await prisma.maintance.create({
          data: {
            price: Number(price),
            type,
            date,
            nextMaintanceMillageKM:
              car.mileageKM + (nextMaintanceMillageKM || 10000),
            place,
            description,
            masterName,
            status,
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
          },
          include: {
            auto: true,
          },
        });

        res.status(201).json(maintance);
      },
      { timeout: 20000 }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

const editMaintance = async (req, res) => {
  try {
    const {
      price,
      type,
      date,
      nextMaintanceMillageKM,
      place,
      status,
      description,
      masterName,
      autoId,
    } = req.body;
    const { id } = req.params;

    const maintance = await prisma.maintance.findFirst({
      where: {
        id,
      },
    });

    if (!maintance) {
      return res.status(404).json({ message: "Не удалось получить ТО" });
    }

    const updatedMaintance = await prisma.maintance.update({
      where: {
        id,
      },
      data: {
        price: Number(price) || maintance.price,
        type: type || maintance.type,
        date: date || maintance.date,
        nextMaintanceMillageKM:
          nextMaintanceMillageKM || maintance.nextMaintanceMillageKM,
        place: place || maintance.place,
        description: description || maintance.description,
        masterName: masterName || maintance.masterName,
        autoId: autoId || maintance.autoId,
        userId: req.user.id,
        status: status || maintance.status,
      },
      include: {
        auto: true,
      },
    });

    res.status(200).json(updatedMaintance);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

const getMaintance = async (req, res) => {
  try {
    const maintances = await prisma.maintance.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        auto: true,
      },
    });

    res.status(200).json(maintances);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeMaintence = async (req, res) => {
  try {
    const { id } = req.params;

    const maintance = await prisma.maintance.findFirst({
      where: {
        id,
      },
    });

    if (!maintance) {
      return res.status(404).json({ message: "Не удалось получить ТО" });
    }

    await prisma.maintance.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createMaintance,
  editMaintance,
  removeMaintence,
  getMaintance,
};
