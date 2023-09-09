import mongoose from "mongoose"
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
const ProductSchema = mongoose.Schema(
    {
        categories: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        product_name: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        active_flag: {
            type: Number,
            enum: [1, 2, 3],
            default: 1 // 1 = active 2 = deactivate 3 = delete
        }
    },
    { timestamps: true }
)
ProductSchema.plugin(aggregatePaginate)
export default mongoose.model("Product", ProductSchema)