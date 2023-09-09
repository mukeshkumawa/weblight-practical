import { messages } from "../config/response.messages.js"
import * as categoryService from "../services/category.js"
import * as Helper from "../helper/index.js"
import mongoose from "mongoose"

export async function create(req, res) {
  try {
    let createObj = {
      category_name: req.body.name
    }
    let result = await categoryService.create(createObj)
    return res.status(201).send({
      message: messages.category_added_success,
      result: result
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}

export async function list(req, res) {
  let data = req.query
  if ([null, undefined, 0, ''].includes(data.page)) {
    data.page = 1
  }
  if ([null, undefined, 0, ''].includes(data.limit)) {
    data.limit = process.env.PAGINATE_LIMIT
  }
  try {
    let result = await categoryService.list(data)
    return res.status(200).send({
      message: messages.success,
      result: result
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}

export async function update(req, res) {
  try {
    let updateObj = {
      category_name: req.body.name
    }
    let result = await categoryService.update(updateObj, mongoose.Types.ObjectId(req.params.id))
    return res.status(200).send({
      message: messages.category_updated_success,
      result: result
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}

export async function destroy(req, res) {
  try {
    let result = await categoryService.destroy(mongoose.Types.ObjectId(req.params.id))
    return res.status(202).send({
      message: messages.category_deleted_success
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}

export async function appList(req, res) {
  let data = req.query
  data.type = 1
  try {
    let result = await categoryService.list(data)
    return res.status(200).send({
      message: messages.success,
      result: result
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}