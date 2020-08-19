'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class GetUser {
  async handle (ctx, next) {
    // call next to advance the request
    ctx.user = await ctx.auth.getUser()

    if(ctx.user.blocked === 1){
      return ctx.response.forbidden()
    }

    await next()
  }
}

module.exports = GetUser
