'use strict'

const Env = use('Env')
const stripe = require('stripe')(Env.get('STRIPE_SK'))
const User = use('App/Models/User')
const Database = use('Database')
var moment = require('moment');
const todayDate = moment().format("Do");
const yearDate = moment().add(1, "year").format("MMMM, Do, YYYY")

class StripeController {

  async index ({ view, auth, response }) {
    let id = await auth.getUser()

    const stripeId = await User.find(id.id)
    const customer = await stripe.customers.retrieve(stripeId.stripe_id)

  if (customer.subscriptions.total_count == 0) {
    //customer is a non paying subscriber
    const message = 'We see that you do not currently have an Enxo subscription.  You can continue to use the site as an accountability partner for free.  If you would like to sign up for a subscription please choose an option below.'
        return view.render('api.stripe', { publishableKey: Env.get('STRIPE_ID'), email: id.email, stripe_id: id.stripe_id, message: message })
  } else {

    return view.render('api.stripe', { publishableKey: Env.get('STRIPE_ID'), email: id.email, stripe_id: id.stripe_id })

  }




  }

  async postStripe ({ request, response, session }) {

    const stripeData = request.only(['stripeToken', 'stripeEmail'])
    try {
      await this.sendStripeData(stripeData)
      session.flash({ status: 'Your card has been successfully charged.' })
      session.put('subscriptionConfirmed', true)
      return response.redirect('/login')
    } catch (e) {
      console.log(e.message)
      session.flash({error: 'Your card has been declined.'}).flash()
      return response.redirect('back')
    }
  }

  //Stripe routes for regular subscribers
  async postStripeMonthly ({ request, response, session, auth }) {
    const stripeEmail = session.get('email')
    const stripeId = request.only('stripeId')
    const stripeInfo = request.only('stripeToken')
    const token = stripeInfo.stripeToken
    const promoCode = request.only('promoCode')
  

    try {
      await this.sendStripeDataMonthly(stripeId.stripeId, token, promoCode.promoCode)
      session.flash({ status: 'Your card has been successfully charged.  Your card will be charged again on the ' + todayDate + ' of every month.' })
      session.put('subscriptionConfirmed', true)
      let id = await auth.getUser()

      await Database
        .table('users')
        .where('id', id.id)
        .update({user_type: 'subscriber', plan: 'monthly'})

      return response.redirect('/dashboard')
    } catch (e) {
      console.log('error ' + e.message)
      session.flash({error: 'Your card has been declined.'}).flash()
      return response.redirect('back')
    }
  }

    async sendStripeDataMonthly (customer, token, promoCode) {
    return new Promise((resolve, reject) => {
      stripe.subscriptions.create({
      customer: customer,
      source: token,
      coupon: promoCode,
      items: [{plan: Env.get('STRIPE_MONTHLY_PLAN')}],
      }, (err) => {
        console.log('error from stripe ' + err)
        if (err && err.type === 'StripeCardError') { return reject(err) }
        return resolve({status: 'Payment confirmed'})
      });
    })
  }

}

module.exports = StripeController
