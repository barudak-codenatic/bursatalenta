const prisma = require('../utils/db');
const bcrypt = require('bcrypt');

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
    where: { email },
    });

    if (!user) {
    throw new Error("User tidak ditemukan");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    throw new Error("Password salah");
    }

    return user;
};

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  loginUser
};
