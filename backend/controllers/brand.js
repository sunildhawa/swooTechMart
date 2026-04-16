const slugify = require("slugify")
const brandData = require("../models/brand")
const { success, error, sendServerError,created ,updated, deleted, sendErrorFlag} = require("../utils/helpers");
const productData = require("../models/product");
const mongoose = require("mongoose");

const getBrand = async (req, res) => {
  try {
    const query = req.query;
    const filter = {};

  
    const limit = query.limit ? Number(query.limit) : 0;

    
    if (query._id) {
      if (!mongoose.Types.ObjectId.isValid(query._id)) {
        return error(res, "Invalid Brand ID");
      }
      filter._id = query._id;
    }

    
    if (query.status !== undefined)
      filter.status = query.status === "true";

    if (query.is_top !== undefined)
      filter.is_top = query.is_top === "true";

    if (query.is_home !== undefined)
      filter.is_home = query.is_home === "true";

    if (query.is_best !== undefined)
      filter.is_best = query.is_best === "true";

  
    const brands = await brandData.find(filter).limit(limit);

    if (!brands.length) {
      return error(res, "No brands found");
    }

 
    const data = await Promise.all(
      brands.map(async (brand) => {
        const count = await productData.countDocuments({
          brand_id: brand._id,
        });

        return {
          ...brand.toObject(),
          productCount: count,
        };
      })
    );

    return success(res, "Brands fetched successfully", data);

  } catch (err) {
    return sendServerError(res, err);
  }
};

const getAPIBrand = async(req,res)=>{
    try{
       const {id} = req.params;
       const data = await brandData.findById(id);
     if(!data){
       return error(res, "Brand not found !")
     }
     success(res,"brands", data)
    }catch(err){
     return sendServerError(res,err)
    }
}
const postBrand = async (req, res) => {
  try {
    const saveData = req.body;
    if (!saveData.name) {
      return res.status(400).json({
        success: false,
        message: "Brand name is required",
      });
    }
    const exist = await brandData.findOne({ name: saveData.name });
    if (exist) {
      return res.status(409).json({
        success: false,
        message: "Brand already exists",
      });
    }
    if (req.file) saveData.image = req.file.filename;

    saveData.slug = slugify(saveData.name, {
      lower: true,
      strict: true,
    });
    const data = await brandData.create(saveData);
    return created(res,"Brand Added",data)
  } catch (err) {
    return sendServerError(res, err);
  }
};
const updateBrand = async(req,res)=>{
    try{
        const {id} = req.params;
        const saveData = req.body;
        if(req.file) saveData.image = req.file.filename
        if(saveData.name) saveData.slug = slugify(saveData.name,{lower:true, strict:true})
        const data = await brandData.findByIdAndUpdate(id, saveData,{new:true})
        if(!data) return error(res, "Brand not found !")
        return updated(res)
    }catch(err){
      return sendServerError(res,err)
    }
}
const updateflag = async (req, res) => {
  try {
    const { flag, id } = req.params;

    const brand = await brandData.findById(id);
    if (!brand) {
      return sendErrorFlag(res, "brand not found" );
    }
    
    brand[flag] = !brand[flag];

    await brand.save();

    res.json({
      success: true,
      message: `${flag} updated`,
      data: brand
    });

  } catch (err) {
     return sendServerError(res,err)
  }
};
const deleteBrand = async(req,res)=>{
    try{
       const {id} = req.params;
       const data = await brandData.findByIdAndDelete(id);
       if(!data) return error(res, "Brand not exist !")
          return deleted(res)
    }catch(err){
        return sendServerError(res, err)
    }
}
module.exports = {getBrand,postBrand,getAPIBrand,updateBrand, updateflag,deleteBrand}