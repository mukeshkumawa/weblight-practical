import mongoose from "mongoose"
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: ''
    },
    active_flag: {
      type: Number, default: 1 // 1 = enable, 2 = disable,3 = deleted
    },
  },
  { timestamps: true }
)
customerSchema.plugin(aggregatePaginate)
export default mongoose.model("Customer", customerSchema)