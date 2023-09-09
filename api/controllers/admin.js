import { messages } from "../config/response.messages.js"
import * as adminService from "../services/admin.js"
import * as Helper from "../helper/index.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function login(req, res) {
  try {
    let { email, password } = req.body
    let checkEmail = await adminService.checkEmail(email)
    if (checkEmail == null || checkEmail == '' || checkEmail == undefined) {
      return res.status(550).send({
        message: messages.invalid_credentials
      })
    }
    const passwordResult = await bcrypt.compare(password, checkEmail.password);
    if (passwordResult === false) {
      return res.status(550).send({
        message: messages.invalid_credentials,
      })
    }
    if (checkEmail.active_flag == 2) {
      return res.status(403).send({
        message: messages.user_account_deactivated
      })
    }
    const token = jwt.sign(
      {
        email: checkEmail.email,
        id: checkEmail._id,
        name: checkEmail.name,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "10d",
      }
    );
    return res.status(200).send({
      message: messages.auth_success,
      token: token,
      result: checkEmail,
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}
export async function signup(req, res) {
  try {
    let { name, email, password } = req.body
    let checkEmail = await adminService.checkEmail(email)
    if (checkEmail) {
      return res.status(409).send({
        message: messages.email_already_exist
      })
    }
    password = await bcrypt.hash(password, 10)
    let createObj = {
      name: name,
      email: email,
      password: password
    }
    let result = await adminService.signUp(createObj)
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "10d",
      }
    );
    return res.status(201).send({
      message: messages.user_registered,
      result: result,
      token: token
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}
export async function auth(req, res) {
  try {
    return res.status(200).send({
      message: messages.success,
      result: req.userData
    })
  } catch (err) {
    Helper.writeErrorLog(req, err)
    return res.status(500).send({
      message: err.message ? err.message : messages.error_occurred,
      error: err,
    })
  }
}
