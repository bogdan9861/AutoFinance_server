const { prisma } = require("../prisma/prisma.client");
const uploadFile = require("../utlls/uploadFile");

const createCar = async (req, res) => {
  try {
    const {
      mark,
      model,
      year,
      number,
      mileageKM,
      consumption,
      fuelType,
      color,
    } = req.body;
    const file = req.file;

    const isExist = await prisma.auto.findFirst({
      where: {
        number,
        userId: req.user.id,
      },
    });

    if (isExist) {
      return res
        .status(400)
        .json({ message: "Car with this number is already exist" });
    }

    const prismaCreateCar = async (url) => {
      const car = await prisma.auto.create({
        data: {
          mark,
          model,
          year: Number(year),
          number,
          mileageKM: Number(mileageKM),
          consumption: Number(consumption),
          fuelType,
          color,
          image: url,
          user: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });

      res.status(201).json(car);
    };

    if (file?.path) {
      uploadFile(file?.path)
        .then(({ url }) => {
          prismaCreateCar(url);
        })
        .catch((e) => {
          res.status(500).json({ message: "Failed to upload file" });
        });
    } else {
      prismaCreateCar();
    }
  } catch (error) {
    res.status(500).json({ message: "Unknown server error" });
  }
};

const editCar = async (req, res) => {
  try {
    const {
      mark,
      model,
      year,
      number,
      mileageKM,
      consumption,
      distanceCovered,
      fuelType,
      color,
    } = req.body;
    const { id } = req.params;
    const file = req.file;

    const car = await prisma.auto.findFirst({
      where: {
        id,
      },
    });

    if (!car) {
      return res
        .status(404)
        .json({ message: "Cannot find car with speiied id" });
    }

    const prismaUpdateCar = async (url) => {
      const updatedCar = await prisma.auto.update({
        where: {
          id,
        },
        data: {
          mark: mark || car.mark,
          model: model || car.model,
          year: Number(year) || car.year,
          number: number || car.number,
          mileageKM: Number(mileageKM) || car.mileageKM,
          distanceCovered: Number(distanceCovered) || car.distanceCovered,
          consumption: Number(consumption) || car.consumption,
          fuelType: fuelType || car.fuelType,
          color: color || car.color,
          image: url || car.image,
        },
      });

      return res.status(200).json(updatedCar);
    };

    if (file?.path) {
      uploadFile(file?.path).then(({ url }) => {
        prismaUpdateCar(url);
      });
    } else {
      prismaUpdateCar();
    }
  } catch (error) {
    res.status(500).json({ message: "Unknown server error" });
  }
};

const removeCar = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.auto.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ message: "Unknown server error" });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await prisma.auto.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Unknown server error" });
  }
};

module.exports = {
  createCar,
  editCar,
  removeCar,
  getCars,
};
