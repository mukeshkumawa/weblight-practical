import CategoryDB from "./../models/category.js"
import ProductDB from "./../models/product.js"
import db from "../config/db.js"

export async function create(data) {
  const session = await db.startSession();
  try {
    session.startTransaction();
    const result = await ProductDB.create([data], { session })
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
      result = await ProductDB.find({ active_flag: 1 }).lean()
    } else {
      let option = {
        page: data.page,
        limit: data.limit
      }
      let matchObj = {}
      matchObj.active_flag = { $ne: 3 }
      if (data.search) {
        matchObj.$or = [
          { product_name: { $regex: data.search, $options: 'i' } }
        ]
      }
      // if want to put a condition to restrict product without category 
      // matchObj.category_count = { $gt: 0 }

      if (data.min_price && data.max_price) {
        matchObj.price = {
          $gte: Number(data.min_price),
          $lte: Number(data.max_price)
        }
      }

      let categoryAggregate = ProductDB.aggregate([
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $lookup: {
            from: "categories",
            let: {
              categories: "$categories"
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$active_flag", 1] },
                      { $in: ["$_id", "$$categories"] }
                    ]
                  }
                }
              }
            ],
            as: 'category_data'
          }
        },
        {
          $project: {
            _id: 1,
            product_name: 1,
            price: 1,
            active_flag: 1,
            flag_string: {
              $cond: { if: { $eq: ["$active_flag", 1] }, then: "Active", else: "Deactivate" }
            },
            category_data: { _id: 1, category_name: 1 },
            category_count: { $size: "$category_data" }
          }
        },
        {
          $match: matchObj
        },
      ])
      result = await ProductDB.aggregatePaginate(categoryAggregate, option)
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
    const result = await ProductDB.findOneAndUpdate({ _id: id }, data, { returnDocument: 'after', session: session })
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
    const result = await ProductDB.findOneAndUpdate({ _id: id }, { active_flag: 3 }, { returnDocument: 'after', session: session })
    await session.commitTransaction();
    return result
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error)
  }
}

export async function appList(data) {
  try {
    let result
    let option = {
      page: data.page,
      limit: data.limit
    }
    let matchObj = {}
    matchObj.active_flag = 1
    if (data.search) {
      matchObj.$or = [
        { product_name: { $regex: data.search, $options: 'i' } }
      ]
    }
    matchObj.category_count = { $gt: 0 }

    if (data.min_price && data.max_price) {
      matchObj.price = {
        $gte: Number(data.min_price),
        $lte: Number(data.max_price)
      }
    }

    let categoryAggregate = ProductDB.aggregate([
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $lookup: {
          from: "categories",
          let: {
            categories: "$categories"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$active_flag", 1] },
                    { $in: ["$_id", "$$categories"] }
                  ]
                }
              }
            }
          ],
          as: 'category_data'
        }
      },
      {
        $project: {
          _id: 1,
          product_name: 1,
          price: 1,
          active_flag: 1,
          flag_string: {
            $cond: { if: { $eq: ["$active_flag", 1] }, then: "Active", else: "Deactivate" }
          },
          category_data: { _id: 1, category_name: 1 },
          category_count: { $size: "$category_data" }
        }
      },
      {
        $match: matchObj
      },
    ])
    result = await ProductDB.aggregatePaginate(categoryAggregate, option)

    return result
  } catch (error) {
    throw new Error(error)
  }
}