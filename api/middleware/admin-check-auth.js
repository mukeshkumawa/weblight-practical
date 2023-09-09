import jwt from "jsonwebtoken";
import AdminDB from "../models/admin.js";
export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.userData = decoded;
    const { id } = decoded;
    const userData = await AdminDB.findOne({ _id: id });
    if(userData == null){
      return res.status(401).json({
        message: "Auth fail",
      });
    }else if(userData && userData.active_flag != 1){
      return res.status(403).json({
        message: "Your account is disabled.",
      });
    }
    req.userData = userData;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Auth fail",
    });
  }
};
