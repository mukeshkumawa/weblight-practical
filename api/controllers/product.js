import { messages } from "../config/response.messages.js"
import * as productService from "../services/product.js"
import * as Helper from "../helper/index.js"
import mongoose from "mongoose"

export async function create(req, res) {
  try {
    let createObj = {
      categories: (req.body.categories).split(","),
      product_name: req.body.product_name,
      price: req.body.price
    }
    let result = await productService.create(createObj)
    return res.status(201).send({
      message: messages.product_added_success,
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
    let result = await productService.list(data)
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
      categories: (req.body.categories).split(","),
      product_name: req.body.product_name,
      price: req.body.price
    }
    let result = await productService.update(updateObj, mongoose.Types.ObjectId(req.params.id))
    return res.status(200).send({
      message: messages.product_updated_success,
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
    let result = await productService.destroy(mongoose.Types.ObjectId(req.params.id))
    return res.status(202).send({
      message: messages.product_deleted_success
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
  if ([null, undefined, 0, ''].includes(data.page)) {
    data.page = 1
  }
  if ([null, undefined, 0, ''].includes(data.limit)) {
    data.limit = process.env.PAGINATE_LIMIT
  }
  try {
    let result = await productService.appList(data)
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