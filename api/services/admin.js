import AdminDB from "./../models/admin.js"
import db from "./../config/db.js"

export async function checkEmail(email) {
  try {
    return await AdminDB.findOne({
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
    const result = await AdminDB.create([data], { session })
    await session.commitTransaction();
    return result
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error)
  }
}