const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middleware/auth');

// Configurar storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, 'uploads');
    
    if (file.fieldname === 'foto_perfil') {
      uploadPath = path.join(uploadPath, 'profiles');
    } else if (file.fieldname === 'imagem_capa') {
      uploadPath = path.join(uploadPath, 'covers');
    } else if (file.fieldname === 'banner') {
      uploadPath = path.join(uploadPath, 'banners');
    } else if (file.fieldname === 'post_imagem') {
      uploadPath = path.join(uploadPath, 'posts');
    } else {
      uploadPath = path.join(uploadPath, 'misc');
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas (JPG, PNG, GIF, WebP)'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: fileFilter
});

// Upload de foto de perfil
router.post('/profile', authenticateToken, upload.single('foto_perfil'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  res.json({
    filename: req.file.filename,
    path: `/uploads/profiles/${req.file.filename}`,
    originalname: req.file.originalname,
    size: req.file.size
  });
});

// Upload de imagem de capa
router.post('/cover', authenticateToken, upload.single('imagem_capa'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  res.json({
    filename: req.file.filename,
    path: `/uploads/covers/${req.file.filename}`,
    originalname: req.file.originalname,
    size: req.file.size
  });
});

// Upload de banner
router.post('/banner', authenticateToken, upload.single('banner'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  res.json({
    filename: req.file.filename,
    path: `/uploads/banners/${req.file.filename}`,
    originalname: req.file.originalname,
    size: req.file.size
  });
});

// Upload de imagem de post
router.post('/post', authenticateToken, upload.single('post_imagem'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  res.json({
    filename: req.file.filename,
    path: `/uploads/posts/${req.file.filename}`,
    originalname: req.file.originalname,
    size: req.file.size
  });
});

module.exports = router;

