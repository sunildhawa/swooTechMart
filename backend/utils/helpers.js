
const success = (res, message = "Success", data= null) =>
   res.status(200).json({success: true, message, data});

const created = (res, message="Created Successfull !", data= null) =>
   res.status(201).json({success: true, message, data});

const updated = (res, message= "Updated Successfull !", data= null) =>
   res.status(200).json({success: true, message, data});

const deleted = (res, message= "Deleted Successfull !", data= null) =>
   res.status(200).json({success: true, message, data});

const sendExist = (res, message= "Already Exist !", data= null) =>
   res.status(409).json({success: false, message, data});

const error = (res, message= "Bad Request !")=>
   res.status(400).json({success: false, message});

const sendErrorFlag = (res, message="Not Found!", data= null) =>
   res.status(404).json({success: false, message, data});

const sendServerError = (res,err)=>{
   console.log("SERVER ERROR! ", err);
   res.status(500).json({success: false, message:"Internal Server Error !"})
}
module.exports = {
  success,
  created,
  updated,
  error,
  sendErrorFlag,
  sendServerError,
  deleted,
  sendExist,
}
 


























// const success = (res, message = "Success", data = null) =>
//   res.status(200).json({ success: true, message, data });

// const created = (res, message = "Created Successfully!", data = null) =>
//   res.status(201).json({ success: true, message, data });

// const updated = (res, message = "Updated Successfully!", data = null) =>
//   res.status(200).json({ success: true, message, data });

// const deleted = (res, message = "Deleted Successfully!", data = null) =>
//   res.status(200).json({ success: true, message, data });

// const sendExist = (res, message = "Already Exists", data = null) =>
//   res.status(409).json({ success: false, message, data });

// const error = (res, message = "Bad Request") =>
//   res.status(400).json({ success: false, message });

// const sendErrorFlag = (res, message = "Not Found", data = null) =>
//   res.status(404).json({ success: false, message, data });

// const sendServerError = (res, err) => {
//   console.error("SERVER ERROR:", err);
//   return res.status(500).json({success: false, message: "Internal Server Error" })};


// module.exports = {
//   success,
//   created,
//   updated,
//   deleted,
//   sendExist,
//   error,
//   sendErrorFlag,
//   sendServerError
// };
