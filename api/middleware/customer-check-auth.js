import jwt from "jsonwebtoken"
import CustomerDB from "../models/customer.js"
export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const { id } = decoded;
    const userData = await CustomerDB.findOne({ _id: id, active_flag: { $in: [1, 2] } });
    if (userData === null) {
      return res.status(401).json({
        message: "Auth fail",
      });
    } else if (userData && userData.active_flag == 2) {
      return res.status(403).json({
        message: "Your account is deactivated. Please contact with admin.",
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
