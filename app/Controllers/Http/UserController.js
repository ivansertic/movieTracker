'use strict'
const {validate, sanitize}= use("Validator")
const User = use("App/Models/User")

class UserController {

  async getUserInfo({response, user}){

    return response.ok({
      username: user.username,
      email: user.email
    })
  }

  async editUserData({request,response, user}){
    const allParams = sanitize(request.post(),{
      email: "normalize_email"
    })

    const validator = await validate(allParams,{
      email:"email",
      password:"min:6|confirmed"
    })

    if(validator.fails()){
      return response.badRequest({
        _message:"Params incorrect"
      })
    }

    if(allParams.username) {
      const existingUser = await User.query().where("username", allParams.username).first()
      if(existingUser){
        return response.badRequest({
          _message:"Username already exists"
        })
      }
    }

    await user.merge({
      username:allParams.username,
      email: allParams.email,
      password: allParams.password
    })

    await user.save()

    return response.ok()
  }
}

module.exports = UserController
