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

const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to get user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedUser = await userService.updateUser(id, req.body);

    res.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(500).json({ message: 'Failed to update user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    // Simpan session user ID
    req.session.userId = user.id;

    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout berhasil" });
  });
};

const checkSession = (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, userId: req.session.userId });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports = {
    register,
    getUser,
    updateUser,
    login,
    logout,
    checkSession
};
