const { Prisma } = require('@prisma/client');
const userService = require('../services/userService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed. Only JPEG, PNG, and GIF files are permitted.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

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
      address: user.address,
      born_date: user.born_date,
      no_hp: user.no_hp,
      status: user.status,
      porto_link: user.porto_link,
      photo: user.photo,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to get user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateData = {};
    
    // Handle form field names from frontend (nama_lengkap, tanggal_lahir, etc.)
    if (req.body.nama_lengkap !== undefined && req.body.nama_lengkap !== null && req.body.nama_lengkap !== '') {
      updateData.name = req.body.nama_lengkap;
    }
    
    if (req.body.alamat_domisili !== undefined && req.body.alamat_domisili !== null && req.body.alamat_domisili !== '') {
      updateData.address = req.body.alamat_domisili;
    }
    
    if (req.body.tanggal_lahir !== undefined && req.body.tanggal_lahir !== null && req.body.tanggal_lahir !== '') {
      // Convert date string to ISO format for Prisma
      updateData.born_date = new Date(req.body.tanggal_lahir).toISOString();
    }
    
    if (req.body.no_hp !== undefined && req.body.no_hp !== null && req.body.no_hp !== '') {
      updateData.no_hp = req.body.no_hp;
    }
    
    if (req.body.status !== undefined && req.body.status !== null && req.body.status !== '') {
      updateData.status = req.body.status;
    }
    
    if (req.body.cv_link !== undefined && req.body.cv_link !== null && req.body.cv_link !== '') {
      updateData.porto_link = req.body.cv_link;
    }

    // Handle photo upload
    if (req.file) {
      updateData.photo = req.file.filename;
    }

    console.log('Update data:', updateData);

    const updatedUser = await userService.updateUser(id, updateData);

    res.json({
      message: 'User updated successfully',
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
      born_date: updatedUser.born_date,
      no_hp: updatedUser.no_hp,
      status: updatedUser.status,
      porto_link: updatedUser.porto_link,
      photo: updatedUser.photo,
    });
  } catch (error) {
    console.error('Update user error:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);

    // Simpan session user ID
    req.session.userId = user.id;
    req.session.role = user.role;

    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        address: user.address,
        born_date: user.born_date,
        no_hp: user.no_hp,
        status: user.status,
        porto_link: user.porto_link,
        photo: user.photo,
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

const checkSession = async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await userService.getUserById(req.session.userId);
      if (user) {
        res.json({ 
          loggedIn: true, 
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      } else {
        res.json({ loggedIn: false });
      }
    } else {
      res.json({ loggedIn: false });
    }
  } catch (error) {
    console.error('Check session error:', error);
    res.json({ loggedIn: false });
  }
};

module.exports = {
    register,
    getUser,
    updateUser,
    login,
    logout,
    checkSession,
    upload
};
