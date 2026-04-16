const mongoose = require("mongoose")
const categoryData = require("../models/category");
const slugify = require("slugify")
const {
  success,
  error,
  sendServerError,
  created,
  updated,
  deleted,
  sendExist,
  sendErrorFlag
} = require("../utils/helpers");
const productData = require("../models/product");

// const getCate = async (req, res) => {
//   try {
//     const query = req.query;
//     const filter = {};
//     const limit = Number(query.limit) || 0;

//     if (query.id) {
//       if (!mongoose.Types.ObjectId.isValid(query.id)) {
//         return error(res, "Invalid category id");
//       }
//       filter._id = query.id;
//     }

//     if (query.status) filter.status = query.status === "true";
//     if (query.is_top) filter.is_top = query.is_top === "true";
//     if (query.is_home) filter.is_home = query.is_home === "true";
//     if (query.is_best) filter.is_best = query.is_best === "true";

//     const categories = await categoryData.find(filter).limit(limit);

//     if (!categories.length) {
//       return error(res, "No categories found!");
//     }
//     const data = await Promise.all(
//       categories.map(async (cat) => {
//         const count = await productData.countDocuments({
//           category_id: cat._id,
//         });
//         return { ...cat.toObject(), count };
//       })
//     );
//     return success(res, "Category", data)
//   } catch (err) {
//     return sendServerError(res, {err: err.message});
//   }
// };
// // const getCate = async (req, res) => {
// //   try {
// //     const data = await categoryData.find();
// //     if (!data || data.length === 0) {
// //      return error(res, "No categories found!");
// //     }
// //     return success(res, data);
// //   } catch (err) {
// //     return sendServerError(res, err);
// //   }
// // };
// // const getCate = async(req,res)=>{
// //     try{
// //       const query = req.query;
// //       const filter = {} ;
// //       const limit =  Number(query.limit) || 0

// //       if(query._id){
// //          if(!mongoose.Types.ObjectId.isValid(query._id)){
// //             return error(res, " Invalid Category Id !")
// //          }
// //          filter._id = query._id
// //       }
// //       if(query.status) filter.status = query.status ===  "true"
// //       if(query.is_top) filter.is_top = query.is_top === "false";
// //       if(query.is_home) filter.is_home = query.is_home === "false";
// //       if(query.is_best) filter.is_best = query.is_best === "false";
      
// //       const category = await categoryData.find(filter).limit(limit)
// //       if(!category.length) return error(res, "Category not found!");
// //       return success(res,"Category Found !", category)
// //     }catch(error){
// //       sendServerError(res,error.message)
// //     }
// // }
const getCate = async(req,res)=>{
  try{
  const query = req.query;
  const filter = {};
  const limit = Number(query.limit) || 0

  if(query._id){
    if(!mongoose.Types.ObjectId.isValid(query._id)){
      return error(res,"Invalid Category Id !")
    }
    filter._id = query._id;
  }
  if(query.status) filter.status = query.status === "true";
  if(query.is_top) filter.is_top = query.is_top === "false";
  if(query.is_home)filter.is_home = query.is_home === "false";

  const category = await categoryData.find(filter).limit(limit);
  if(!category.length) return error(res,"category not found !");
   
  const data = await Promise.all(
    category.map( async(cat)=>{
      const count = await productData.countDocuments({
        category_id: cat._id,
      });
      return {...cat.toObject(), count}
    })
  )
  return success(res,"category found!", data)
}catch(err){
   sendServerError(res,err)
}

}

const getAPICate = async (req, res) => {
  try {
    const data = await categoryData.findById(req.params.id);
    if (!data) return error(res, "Category not found");
    return success(res,"category" ,data);
  } catch (err) {
    return sendServerError(res, err);
  }
};

const postCate = async (req, res) => {
  try {
    const saveData = req.body;

    if (req.file) saveData.image = req.file.filename;
   
    if (saveData.name)
      saveData.slug = slugify(saveData.name, { lower: true, strict: true });

    const exists = await categoryData.findOne({ name: saveData.name });
    if (exists) return sendExist(res, "Category Already Exist")

    const data = await categoryData.create(saveData);
    return created(res, "Category Created Successfull", data); 

  } catch (err) {
    return sendServerError(res, err);
  }
};


const updateCate = async (req, res) => {
  try {
    const saveData = req.body;
    const { id } = req.params;
    if(!id) return sendErrorFlag(res,"Category Id Invalid !")
    if (req.file) saveData.image = req.file.filename;
     if(saveData.name) saveData.slug = slugify(saveData.name,{lower:true, strict:true})
      const data = await categoryData.findByIdAndUpdate(
        id,
       saveData,
      { new: true }
    );

    if (!data) return error(res, "Category not found");
    return updated(res,"update Category Successfull !",data);
  } catch (err) {
    return sendServerError(res, err);
  }
};


const deleteCate = async (req, res) => {
  try {
    const data = await categoryData.findByIdAndDelete(req.params.id);
    if (!data) return error(res, "Category not found");
    return deleted(res);
  } catch (err) {
    return sendServerError(res, err);
  }
};

const updateflag = async (req, res) => {
  try {
    const { flag, id } = req.params;

    const category = await categoryData.findById(id);
    if (!category) {
      return sendErrorFlag(res, "category not found" );
    }

    category[flag] = !category[flag];

    await category.save();

    res.json({
      success: true,
      message: `${flag} updated`,
      data: category
    });

  } catch (err) {
     return sendServerError(res,err)
  }
};


module.exports = {
  getCate,
  getAPICate,
  postCate,
  updateCate,
  deleteCate,
  updateflag
};
