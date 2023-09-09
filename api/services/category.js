import CategoryDB from "./../models/category.js"
import ProductDB from "./../models/product.js"
import db from "../config/db.js"

export async function create(data) {
  const session = await db.startSession();
  try {
    session.startTransaction();
    const result = await CategoryDB.create([data], { session })
    await session.commitTransaction();
    return result
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error)
  }
}

export async function list(data) {
  try {
    let result
    if (data.type == 1) {
      result = await CategoryDB.find({ active_flag: 1 }).sort({ _id: -1 }).select('_id category_name').lean()
    } else {
      let option = {
        page: data.page,
        limit: data.limit
      }
      let matchObj = {}
      matchObj.active_flag = { $ne: 3 }
      if (data.search) {
        matchObj.$or = [
          { category_name: { $regex: data.search, $options: 'i' } }
        ]
      }
      let categoryAggregate = CategoryDB.aggregate([
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $match: matchObj
        },
        {
          $project: {
            _id: 1,
            category_name: 1,
            active_flag: 1,
            flag_string: {
              $cond: { if: { $eq: ["$active_flag", 1] }, then: "Active", else: "Deactivate" }
            }
          }
        }
      ])
      result = await CategoryDB.aggregatePaginate(categoryAggregate, option)
    }
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export async function update(data, id) {
  const session = await db.startSession();
  try {
    session.startTransaction();
    const result = await CategoryDB.findOneAndUpdate({ _id: id }, data, { returnDocument: 'after', session: session })
    await session.commitTransaction();
    return result
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error)
  }
}

export async function destroy(id) {
  const session = await db.startSession();
  try {
    session.startTransaction();
    const result = await CategoryDB.findOneAndUpdate({ _id: id }, { active_flag: 3 }, { returnDocument: 'after', session: session })
    // pull category from product if want to do (optional)
    await ProductDB.findOneAndUpdate({ categories: { $in: id } }, { $pull: { categories: id } }, { multi: true, session: session })
    await session.commitTransaction();
    return result
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error)
  }
}