const uploadFile = require("../utlls/uploadFile");
const { prisma } = require("../prisma/prisma.client");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isExist) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Failed to register user" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      ...user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Unknown server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    if (user && isPasswordCorrect) {
      res.status(200).json({ ...user, token });
    } else {
      res.status(400).json({ message: "Incorrect login data" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Unknown server error" });
  }
};

const current = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Unknown server error" });
  }
};

const edit = async (req, res) => {
  try {
    const { name, email } = req.body;

    console.log("req.body ===>", req.body);

    const file = req.file;

    const prismaUserUpdate = async (url) => {
      const user = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          name: name || req.user.name,
          email: email || req.user.email,
          image: url || req.user.image,
        },
      });

      return res.status(200).json(user);
    };

    if (file?.path) {
      uploadFile(file?.path).then(({ url }) => {
        prismaUserUpdate(url);
      });
    } else {
      prismaUserUpdate();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unknown server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      req.user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Старый пароль не совпадает" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unknown server error" });
  }
};

const removeUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Unknown server error" });
  }
};

module.exports = {
  register,
  login,
  current,
  edit,
  removeUser,
  changePassword,
};
