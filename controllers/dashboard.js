const { prisma } = require("../prisma/prisma.client");

const getDashboard = async (req, res) => {
  try {
    const [
      expencesSum,
      maintanceSum,
      fuelExpencess,
      maintanceExpencess,
      averageExpencess,
    ] = await Promise.all([
      prisma.expencess.aggregate({
        where: { userId: req.user.id },
        _sum: { price: true },
      }),

      prisma.maintance.aggregate({
        where: { userId: req.user.id },
        _sum: { price: true },
      }),

      prisma.expencess.aggregate({
        where: { userId: req.user.id, type: "FUEL" },
        _sum: { price: true },
      }),

      prisma.expencess.aggregate({
        where: { userId: req.user.id, type: "MAINTANCE" },
        _sum: { price: true },
      }),

      (async () => {
        const cars = await prisma.auto.findMany({
          where: { userId: req.user.id },
          include: {
            expencesses: true,
            maintances: true,
          },
        });

        if (!cars.length) return 0;

        const total = cars.reduce((sum, car) => {
          const exp = car.expencesses.reduce((s, e) => s + e.price, 0);
          const maint = car.maintances.reduce((s, m) => s + m.price, 0);
          return sum + exp + maint;
        }, 0);

        return total / cars.length;
      })(),
    ]);

    const totalCommonExpencess =
      (expencesSum._sum.price || 0) + (maintanceSum._sum.price || 0);

    res.json([
      { label: "Общие затраты", value: totalCommonExpencess },
      { label: "Топливо", value: fuelExpencess._sum.price || 0 },
      { label: "Обслуживание", value: maintanceExpencess._sum.price || 0 },
      { label: "В среднем на авто", value: averageExpencess },
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unknown server error" });
  }
};

module.exports = {
  getDashboard,
};
