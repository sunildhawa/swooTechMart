const multer = require("multer");
const path = require("path");

/* ===============================
   COMMON FILENAME FUNCTION
================================ */
const fileName = (req, file, cb) => {
  cb(null, Date.now() + path.extname(file.originalname));
};

/* ===============================
   FILE FILTER (IMAGE ONLY)
================================ */
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".jpg", ".jpeg", ".png", ".webp", ".jfif",".avif"];

  if (
    file.mimetype.startsWith("image/") &&
    allowedExt.includes(ext)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};


/* ===============================
   STORAGE CONFIGS
================================ */

// CATEGORY
const categoryStorage = multer.diskStorage({
  destination: "Public/category",
  filename: fileName,
});

// PRODUCT THUMBNAIL
const productStorage = multer.diskStorage({
  destination: "Public/products",
  filename: fileName,
});

// PRODUCT OTHER IMAGES
const productOtherStorage = multer.diskStorage({
  destination: "Public/products/other",
  filename: fileName,
});

// BRAND
const brandStorage = multer.diskStorage({
  destination: "Public/brand",
  filename: fileName,
});

// USER
const userStorage = multer.diskStorage({
  destination: "Public/user",
  filename: fileName,
});
const adminStorage = multer.diskStorage({
  destination: "Public/admin",
  filename: fileName
})
/* ===============================
   UPLOAD MIDDLEWARES
================================ */
const uploadCategory = multer({ storage: categoryStorage, fileFilter });
const uploadProduct = multer({ storage: productStorage, fileFilter });
const uploadsOther = multer({ storage: productOtherStorage, fileFilter });
const uploadBrand = multer({ storage: brandStorage, fileFilter });
const uploadsUser = multer({ storage: userStorage, fileFilter });
const uploadsAdmin = multer({storage: adminStorage, fileFilter})

module.exports = {
  uploadCategory,
  uploadProduct,
  uploadsOther,
  uploadBrand,
  uploadsUser,
  uploadsAdmin,
};
