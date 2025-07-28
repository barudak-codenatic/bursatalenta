const { Prisma } = require('@prisma/client');
const userService = require('../services/userService');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await userService.createUser({ name, email, password, role });
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(400).json({ message: 'Email sudah ada' });
    }

    res.status(500).json({ message: 'Failed to register user' });
  }
};

module.exports = {
    register,
};
