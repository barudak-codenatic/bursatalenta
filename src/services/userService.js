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

const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
