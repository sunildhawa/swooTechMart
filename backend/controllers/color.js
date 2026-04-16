const slugify = require("slugify");
const colorData = require("../models/color");
const { success, error, sendServerError, created, updated, deleted, sendExist } = require("../utils/helpers");
const productData = require("../models/product");

const getColor = async (req, res) => {
  try {
    const query = req.query;
    const filter = {};
    const limit = Number(query.limit) || 0;
    if(query._id) filter._id = query._id;
    if(query.status) filter.status = query.status === "true"
   
    const colors = await colorData.find(filter).limit(limit);
    if (!colors || colors.length === 0) {
      return res.status(400).json({success: false, message: "not found color", colors})
    }
    const data = await Promise.all(
      colors.map(async(color)=>{
        const count = await productData.countDocuments(
          {color_id : color._id}
        )
        return {...color.toObject(), count}
      })
    )
    return success(res,"Colors", data)
  } catch (err) {
    return sendServerError(res,err)
  }
};

// const getColor = async(req,res)=>{
//   try{
//     const data = await colorData.find();
    
//   }catch(err){
    
//   }
 
// }
const getAPIColor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await colorData.findById(id);
    if (!data) return error(res, "Color not found !");
    return success(res,"color", data);
  } catch (err) {
    return sendServerError(res, err);
  }
};

const postColor = async (req, res) => {
  try {
    const saveData = req.body;
    
    if (saveData.name) saveData.slug = slugify(saveData.name, { lower: true, strict: true });
    const exist = await colorData.findOne({name: saveData.name});
    if(exist) return sendExist(res,"color Already Exist !")
    const data = await colorData.create(saveData)
    return created(res, "Color Created Successfull !", data);
  } catch (err) {
    return sendServerError(res, err);
  }
};
const updateColor = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return error(res, "Name & color code required");
    }

    const saveData = {
      name: name.trim(),
      code,
      slug: slugify(name, { lower: true, strict: true })
    };

    const data = await colorData.findByIdAndUpdate(
      req.params.id,
      saveData,
      { new: true }
    );

    if (!data) return error(res, "Color not found");

    return updated(res,"Color Updated Successfull", data);
  } catch (err) {
    return sendServerError(res, err);
  }
};

const updateflag = async (req, res) => {
  try {
    const { flag, id } = req.params;

    const color = await colorData.findById(id);
    if (!color) return error(res, "Color not found");

    color[flag] = !color[flag];
    await color.save();
    res.status(200).json({
      success: true,
      message: `${flag} updated`,
      data: color
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

const deleteColor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await colorData.findByIdAndDelete(id);
    if (!data) return error(res, "Color not exist !");
    return deleted(res);
  } catch (err) {
    return sendServerError(res, err);
  }
};

module.exports = { getColor, postColor, getAPIColor, updateColor, deleteColor, updateflag };
