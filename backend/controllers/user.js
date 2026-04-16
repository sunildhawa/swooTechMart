const userData = require("../models/user")
const { sendServerError ,success,created, sendErrorFlag,deleted,error,updated, sendExist} = require("../utils/helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getUser = async(req,res)=>{
    try{
       const data = await userData.find();
       if(!data) return error(res, "Not Found User!")
       return success(res, "User", data)

    }catch(error){
        sendServerError(res,error)
    }
}
const getAPIUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return error(res, "User ID is required");
    }

    const saveData = await userData.findById(id);

    if (!saveData) {
      return sendErrorFlag(res, "User not found");
    }

    return success(res,"user", saveData);

  } catch (err) {
    return sendServerError(res, err);
  }
};

const postUser = async (req, res) => {
  try {
    const saveData = req.body;

 
    if (req.file) {
      saveData.profilePic = req.file.filename;
    }

    const emailExist = await userData.findOne({ email: saveData.email });
    if (emailExist) {
      return sendExist(res, "Email already exists!");
    }

    if (!saveData.password) {
      return error(res, "Password is required");
    }

    saveData.password = await bcrypt.hash(saveData.password, 10);

    const data = await userData.create(saveData);

  
    data.password = undefined;

    return created(res, "User Created Successfully!", data);

  } catch (err) {
    console.log("POST USER ERROR:", err);
    return sendServerError(res, err);
  }
};



const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const saveData = req.body;
    if(req.file){
      saveData.profilePic = req.file.filename;
    }
    const data = await userData.findByIdAndUpdate(
      id,
      saveData,
      { new: true }
    );

    if (!data) {
      return error(res, "No user found !");
    }

    return updated(res, "Updated Successful !", data);

  } catch (err) {
    return sendServerError(res, err);
  }
};
const updateFlagUser = async (req, res) => {
  try {
    const { id , flag} = req.params;
   
    const saveData = await userData.findById(id);
    
    if (!saveData){
      return sendErrorFlag(res, "User not found");
    }
    saveData[flag] = !saveData[flag]
    await saveData.save()
    return updated(res, `Status Updated Successfully!`, saveData);

  } catch (err) {
    console.error("UPDATE FLAG USER ERROR:", err);
    return sendServerError(res, err);
  }
};

const deleteUser = async(req,res)=>{
  try{
    const {id} = req.params;
    const data = await userData.findByIdAndDelete(id);
    if(!data) return error(res, "Data not found!")
    return deleted(res, "Deleted Successfull!", data)
  }catch(err){
    return sendServerError(res, err)
  }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. User ko fetch karein
        const user = await userData.findOne({ email }).select("+password");
        
        if (!user) {
            return error(res, "Invalid Email !");
        }

        // 🚀 2. INACTIVE STATUS CHECK (Yahan add kiya hai)
        // Agar status 0 hai ya false hai (jo bhi aapne database mein rakha ho)
        if (user.status === 0 || user.status === false) {
            return error(res, "Aapka account admin dwara block kar diya gaya hai!");
        }

        // 3. Password match karein
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return error(res, "Invaild Password !");

        // 4. Token generate karein
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        user.password = undefined;
        success(res, "Login Successfull", { token, user });

    } catch (err) {
        return sendServerError(res, err);
    }
};
const signup = async (req, res) => {
    try {
        const saveData = req.body;
        if (!saveData.name || !saveData.email || !saveData.password) {
            return error(res, "All fields required !")
        }
        if (req.file) saveData.image = req.file.filename
        const Exist = await userData.findOne({ email: saveData.email });
        if (Exist) return sendExist(res, "Email Already Exist !")

        saveData.password = await bcrypt.hash(saveData.password, 10)

        const data = await adminModel.create(saveData);
        data.password = undefined
        return created(res, "sign up Successfull !", data)
    } catch (err) {
        return sendServerError(res, err)
    }

}




module.exports = {getUser,getAPIUser,postUser,updateUser,updateFlagUser,deleteUser,signup,login}