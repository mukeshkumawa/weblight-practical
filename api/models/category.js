import mongoose from "mongoose"
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
const CategorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      default: ''
    },
    active_flag: {
      type: Number,
      enum: [1, 2, 3],
      default: 1 // 1 = active 2 = deactivate 3 = delete
    }
  },
  { timestamps: true }
)
CategorySchema.plugin(aggregatePaginate)
export default mongoose.model("Category", CategorySchema)