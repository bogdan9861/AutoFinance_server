const { prisma } = require("../prisma/prisma.client");
const uploadFile = require("../utlls/uploadFile");

const createReport = async (req, res) => {
  try {
    const { name } = req.body;

    uploadFile(req?.file?.path)
      .then(async ({ url }) => {
        const report = await prisma.report.create({
          data: {
            name,
            fileUrl: url,
          },
        });

        return res.status(200).json(report);
      })
      .catch((e) => {
        console.log(e);

        return res.status(500).json({ message: "Server error" });
      });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany();

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.report.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReport,
  getAllReports,
  deleteReport,
};
