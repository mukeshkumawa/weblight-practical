import mongoose from "mongoose"

const adminSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      required: true,      
    },
    profile_pic:{type:String,default:''},
    password: { type: String, required: true },
    active_flag: { type: Number, default: 1 }, // 1= active 2 = deactivateF
  },
  { timestamps: true }
)
export default mongoose.model("Admin", adminSchema)
