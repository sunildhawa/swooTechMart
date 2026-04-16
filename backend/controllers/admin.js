const adminModel = require("../models/admin");
const { success, created, sendServerError, sendExist, error, updated, sendErrorFlag, deleted } = require("../utils/helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAdmin = async (req, res) => {
  try {
    const query = req.query;
    const filter = {};
    const limit = Number(query.limit) || 0;

    if (query._id) filter._id = query._id;
    if (query.status !== undefined) filter.status = query.status;

    const admins = await adminModel.find(filter).limit(limit);

    if (!admins.length) {
      return error(res, "No Admin User!");
    }

    success(res, "Admin Data Fetching..", admins);
  } catch (err) {
    return sendServerError(res, err);
  }
};

const getByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return error(res, "Admin Id is required !");
        }
        const saveData = await adminModel.findById(id);
        if (!saveData) {
            return sendErrorFlag(res, "admin not found !")
        }
        return success(res, saveData)
    } catch (err) {
        return sendServerError(res, err)
    }
}
// const postAdmin = async(req,res)=>{
//     try{
//     const saveData = req.body;
//     if(!saveData.password || !saveData.email || !saveData.name){
//     return error(res,"All Feild required!");
//     }
//     const exist = await adminModel.findOne({email: saveData.email});
//     if(exist){
//         return sendExist(res,"Email Alreday Exist !")
//     }
//     saveData.password = await bcrypt.hash(saveData.password,10)
//     const data = await adminModel.create(saveData);
//     data.password = undefined;

//     return created(res," Admin Created Successfull !", data)
//     }catch(err){
//         sendServerError(res,err)
//     }
// }
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const saveData = req.body;
        if (req.file) saveData.image = req.file.filename
        const data = await adminModel.findByIdAndUpdate(id, saveData, { new: true });
        if (!data) return error(res, "Admin not found!");
        return updated(res, "updated Succssfull!", data);
    } catch (err) {
        return sendServerError(res, err)
    }
}
const updateflagAdmin = async (req, res) => {
    try {
        const { flag, id } = req.params;
        const admin = await adminModel.findByIdAndUpdate(
            id,
        );
        if (!admin) {
            return sendErrorFlag(res, "Admin not found!")
        }
        admin[flag] = !admin[flag];
        await admin.save()

        res.json({
            success: true,
            message: `${flag} updated`,
            data: admin
        });
    } catch (err) {
        return sendServerError(res, err)
    }
}
const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return sendErrorFlag(res, "Admin Id Inavid")
        // const saveData = req.body;
        const data = await adminModel.findByIdAndDelete(id);
        return deleted(res, "Deleted Successfull Admin !", data)
    } catch (err) {
        sendServerError(res, err)
    }
}
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email }).select("+password");
        if (!admin) {
            return error(res, "Invalid Email !");
        }
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) return error(res, "Invaild Password !")

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
              process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        admin.password = undefined
        success(res, "Login Successfull", { token, admin })
    } catch (err) {
        return sendServerError(res, err)
    }
}
const signUpAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return error(res, "All fields required !");
        }

        const emailLower = email.trim().toLowerCase(); // Trim spaces

        const Exist = await adminModel.findOne({ email: emailLower });
        if (Exist) return sendExist(res, "Email Already Exist !");

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await adminModel.create({
            ...req.body,
            email: emailLower,
            password: hashedPassword,
            image: req.file ? req.file.filename : null
        });

        const responseData = data.toObject();
        delete responseData.password;

        return created(res, "Sign up Successful!", responseData);

    } catch (err) {
        console.error("SIGNUP_ERROR:", err); // Ye terminal mein error dikhayega
        return sendServerError(res, err.message);
    }
}

module.exports = { getAdmin, getByIdAdmin, updateAdmin, updateflagAdmin, loginAdmin, signUpAdmin, deleteAdmin }