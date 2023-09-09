import customerDB from "./../models/customer.js"
import db from "../config/db.js"

export async function checkEmail(email) {
  try {
    return await customerDB.findOne({
      email: email
    })
  } catch (error) {
    throw new Error(error)
  }
}

export async function signUp(data) {
  const session = await db.startSession();
  try {
    session.startTransaction();
    const result = await customerDB.create([data], { session })
    await session.commitTransaction();
    return result
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error)
  }
}

export async function getAllCustomers(data) {
  try {
    let option = {
      page: data.page,
      limit: data.limit
    }
    let matchObj = {}
    matchObj.active_flag = { $ne: 3 }
    if (data.search) {
      matchObj.$or = [
        { name: { $regex: data.search, $options: 'i' } },
        { email: { $regex: data.search, $options: 'i' } }
      ]
    }
    let customerAggregate = customerDB.aggregate([
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
          _id: 0,
          name: 1,
          email: 1,
          active_flag: 1,
          flag_string: {
            $cond: { if: { $eq: ["$active_flag", 1] }, then: "Active", else: "Deactivate" }
          }
        }
      }
    ])
    let result = await customerDB.aggregatePaginate(customerAggregate, option)
    return result
  } catch (error) {
    throw new Error(error)
  }
}