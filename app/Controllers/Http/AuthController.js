'use strict'
const User = use("App/Models/User")
const Hash = use("Hash")
const {validate, sanitize}= use("Validator")

class AuthController {

  async register({request, response}){

    const allParams = sanitize(request.post(),{
      email:"normalize_email"
    })

    const validation = await validate(allParams,{
      username:"required",
      email:"required|email",
      password:"min:6|required|confirmed"
    })

    if(validation.fails()){
      return response.badRequest({
        _message:"Incorrect parameters"
      })
    }

    const check = await User
      .query()
      .where("email",allParams.email)
      .orWhere("username",allParams.username).first()

    if(check){
      return response.badRequest({
        _message:"User with provided email or username already exists"
      })
    }

    await User.create({
      username: allParams.username,
      email: allParams.email,
      password:allParams.password
    })

    return response.ok()
  }

  async login({request, response, auth}){

    const allParams = sanitize(request.post(),{
      email:"normalize_email"
    })

    const validation = await validate(allParams,{
      username: "required",
      password:"min:6|required",
    })

    if(validation.fails()){
      return response.badRequest({
        _message:"Invalid parameters"
      })
    }

    const user = await User
      .query()
      .where("username",allParams.username)
      .orWhere("email", allParams.username)
      .first()


    if(!user){
      return response.badRequest({
        _message:"User with provided username/email does not exist"
      })
    }

    const passwordCheck = await Hash.verify(allParams.password, user.password)

    if(!passwordCheck){
      return response.badRequest({
        _message:"Invalid password"
      })
    }

    const accessToken = await auth.generate(user)

    return response.ok({
      user,
      accessToken: accessToken.token
    })
  }
}

module.exports = AuthController
