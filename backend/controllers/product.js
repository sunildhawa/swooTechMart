const slugify = require("slugify")
const ProductData = require("../models/product");
const {
  success,
  error,
  sendServerError,
  sendExist,
  created,
  sendErrorFlag,
  updated
} = require("../utils/helpers");  
const productData = require("../models/product");

const mongoose = require("mongoose");

const getPro = async (req, res) => {
  try {
    const query = req.query;
    const filter = {};
    const limit = Number(query.limit) || 0;

    if (query.status) {
      filter.status = query.status === "true";
    }

    if (
      query.category_id &&
      mongoose.Types.ObjectId.isValid(query.category_id)
    ) {
      filter.category_id = query.category_id;
    }

    
    if (
      query.brand_id &&
      mongoose.Types.ObjectId.isValid(query.brand_id)
    ) {
      filter.brand_id = query.brand_id;
    }

    
    if (
      query.color_id &&
      mongoose.Types.ObjectId.isValid(query.color_id)
    ) {
      filter.color_id = query.color_id;
    }

   
    if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
    }

    const products = await ProductData.find(filter)
      .limit(limit)
      .populate("brand_id", "name")
      .populate("category_id", "name")
      .populate("color_id", "name code");

    if (!products.length) {
      return success(res, "Products", []);
    }

    return success(res, "Products", products);
  } catch (err) {
    return sendServerError(res, err);
  }
};

const getAPIPro = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    const product = await productData
      .findById(id)
      .populate("brand_id", "name")
      .populate("category_id", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: product,
     });
   } catch (err) {
     console.error(err);
     return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const postPro = async (req, res) => {
  try {
    const saveData = { ...req.body };
    const exist = await productData.findOne({name: saveData.name});
    if(exist) return sendExist(res, "Product Already Exist!")
      
    if (req.file) {
      saveData.thumbnail = req.file.filename;
    }


    if (saveData.name) {
      saveData.slug = slugify(saveData.name, {
        lower: true,
        strict: true,
      });
    }

    const data = await productData.create(saveData)
    return created(res, "Product Created Successfull !", data)

  } catch (err) {
    console.error("POST PRODUCT ERROR 👉", err);
    return sendServerError(res,err)
  }
};

const updatePro = async(req,res)=>{
  try{
  const {id} = req.params;
  if(!id) return sendErrorFlag(res,"Product Id Inavild!")
  const saveData = req.body;
  if(req.file) saveData.thumbnail = req.file.filename;
  if(saveData.name) saveData.slug = slugify(saveData.name,{lower:true, strict:true})
  const data = await productData.findByIdAndUpdate(id, saveData,{new:true})
  if(!data) return error(res,"Product Not Found !")
    return updated(res,"Product Updated Successfull !",data)
  }catch(err){
  return sendServerError(res,err)
  }
}
const updateFlag = async (req, res) => {
  try {
    const { flag, id } = req.params;

    const product = await ProductData.findById(id);
    if (!product) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }

   
    product[flag] = !product[flag];

    await product.save();

    res.json({
      success: true,
      message: `${flag} updated`,
      data: product
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const deletePro = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductData.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product  
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const addOtherImages = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductData.findById(id);
    if (!product) {
      return error(res, "Product not found!");
    }

    if (!req.files || req.files.length === 0) {
      return error(res, "No images uploaded!");
    }

    const images = req.files.map(file => file.filename);

    product.other_images.push(...images);
    await product.save();

    return success(res, product);

  } catch (err) {
    return sendServerError(res, err);
  }
};
module.exports = {getPro,postPro,getAPIPro,updatePro, updateFlag,deletePro,addOtherImages}