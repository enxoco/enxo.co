'use strict'

const { validateAll } = use('Validator')
const users = make('App/Services/UserService')
const User = use('App/Models/User')
const Partner = use('App/Models/Partner')
const Env = use('Env')
const stripe = require('stripe')(Env.get('STRIPE_SK'))
const Database = use('Database')
const Device = use('App/Models/Device')
const shell = require('shelljs')
const Mail = use('Mail')
var moment = require('moment')
const todayDate = moment().format('Do')
const yearDate = moment().format('MMMM, Do')
const Hashids = require('hashids')
const hashids = new Hashids('my!123&Sus35per_Secret Hash murphTastic', 38, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')

class AuthController {
  async viewWelcomeEmail ({ view, request, response }) {
    return view.render('email.newuser')
  }

    // Login a mobile user from our guarddroid app
    async guardDroidLogin ({ request, session, response, auth }) {
      const userInfo = request.all()
  
      try {
        await auth.logout()

        const id = await Database
          .from('users')
          .select('id')
          .where('email', userInfo.email)
          .first()

        var checkDevices = await Database
          .from('devices')
          .select('id', 'device_type', 'port', 'sid')
          .where('id', userInfo.deviceId)
          .limit(1)
        var userId = session.get('adonis-auth')
        const serverLoad = await Database
          .from('devices')
          .select('sid as id')
          .count('sid as count')
          .groupBy('sid')
          .orderBy('sid', 'desc')
        var lastPortInUse = shell.exec(`awk '{print $3}' /etc/guardrails/passwd | sort -un | grep -Ev '8501|9999|9550' |tail -n1`)
        var nextPortAval = parseInt(lastPortInUse) + 1
        var curAvalServer = serverLoad[0]
        var nextAvalServer = curAvalServer.id + 1
        var sid = curAvalServer.id
  
        if (userInfo.email.toLowerCase() == 'demo@enxo.co') {
          return response.send({'id': userInfo.deviceId, 'user': 136, 'port': '9550', 'sid': 2})
        }
  
        if (checkDevices.length !== 0) {
          var device = checkDevices[0]
            // var serverAval = await Database
            // .raw('SELECT max(sid) AS id, COUNT(id) AS count FROM devices', [count])
          return response.send({'id': device.id, 'user': userId, 'port': device.port.toString(), 'sid': sid})
        } else { // Device is not yet in the system.  Need to check guardrails passwd file and find next open port
          if (curAvalServer.count > 100) {
            sid = nextAvalServer
          }
            // adding entry to passwd file
          shell.exec(`echo ${userInfo.deviceId}\t${userInfo.deviceId}\t${nextPortAval} >> /etc/guardrails/passwd && curl -X POST http://guardrails.lxd:6502/reload -H 'Authorization: Basic TWlrZUNvbnJhZF9pUGhvbmU6cGFzc3dvcmQ='`)
          // Add device to the database
          const newDevice = await Database
              .insert({ 'id': userInfo.deviceId, 'user_id': id.id, 'serial_number': userInfo.deviceId, 'device_type': userInfo.model, 'port': nextPortAval, 'sid': sid })
              .into('devices')
        }
        return response.send({'id': userInfo.deviceId, 'user': userId, 'port': nextPortAval, 'sid': sid})
      } catch (e) {
        console.log(e)
        session.flash({ error: 'Invalid Login Credentials' })
        return response.send({ error: 'Invalid Login Credentials' })
      }
    }
  // Display our login page
  async showLogin ({ view, session, response, request }) {
    const user = session.get('adonis-auth')// Get logged in user from session
    if (user) { // If user is logged in, send them to the dashboard
      return response.redirect('dashboard')
    } else { // If not logged in send to the login page
      const referrer = request.get('ref')
      return view.render('auth.login', {ref: referrer.ref})
    }
  }

  // Login a mobile user
  async apiLogin ({ request, session, response, auth }) {
    const userInfo = request.all()

    try {
      await auth.logout()
      await users.login(userInfo, auth)

      var checkDevices = await Database
        .from('devices')
        .select('id', 'device_type', 'port', 'sid')
        .where('id', userInfo.deviceId)
        .limit(1)
      var userId = session.get('adonis-auth')
      const serverLoad = await Database
        .from('devices')
        .select('sid as id')
        .count('sid as count')
        .groupBy('sid')
        .orderBy('sid', 'desc')
      var lastPortInUse = shell.exec(`awk '{print $3}' /etc/guardrails/passwd | sort -un | grep -Ev '8501|9999|9550' |tail -n1`)
      var nextPortAval = parseInt(lastPortInUse) + 1
      var curAvalServer = serverLoad[0]
      var nextAvalServer = curAvalServer.id + 1
      var sid = curAvalServer.id

      if (userInfo.email.toLowerCase() == 'demo@enxo.co') {
        return response.send({'id': userInfo.deviceId, 'user': 136, 'port': '9550', 'sid': 2})
      }

      if (checkDevices.length !== 0) {
        var device = checkDevices[0]
          // var serverAval = await Database
          // .raw('SELECT max(sid) AS id, COUNT(id) AS count FROM devices', [count])
        return response.send({'id': device.id, 'user': userId, 'port': device.port.toString(), 'sid': sid})
      } else { // Device is not yet in the system.  Need to check guardrails passwd file and find next open port
        if (curAvalServer.count > 100) {
          sid = nextAvalServer
        }
          // adding entry to passwd file
        
        shell.exec(`echo ${userInfo.deviceId}\t${userInfo.deviceId}\t${nextPortAval} >> /etc/guardrails/passwd && curl -X POST http://guardrails.lxd:6502/reload -H 'Authorization: Basic TWlrZUNvbnJhZF9pUGhvbmU6cGFzc3dvcmQ='`)
        // Add device to the database
        const newDevice = await Database
            .insert({ 'id': userInfo.deviceId, 'user_id': userId, 'serial_number': userInfo.deviceId, 'device_type': userInfo.model, 'port': nextPortAval, 'sid': sid })
            .into('devices')
      }
      return response.send({'id': userInfo.deviceId, 'user': userId, 'port': nextPortAval, 'sid': sid})
    } catch (e) {
      console.log(e)
      //session.flash({ error: 'Invalid Login Credentials' })
      return response.send({ error: e })
    }
  }

  // Login a user
  async postLogin ({ request, session, auth, response, view }) {
    const userInfo = request.all()
    const rules = {
      email: 'required',
      password: 'required'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    try {
      await users.login(userInfo, auth)

      // //For right now using this trick to redirect the user to their dashboard and update the url
      const referrer = userInfo.ref
      if (referrer) {
        return view.render(referrer)
      }
      console.log(`success redirecting to dashboard`)
      return response.redirect('/dashboard')
    } catch (e) {
      console.log(e)
      session.flash({ error: 'Invalid Login Credentials' })
      return response.redirect('back')
    }
  }

  // Show our registration page for a new subscriber
  async showRegister ({ view, params, session, auth, response }) {
    const stripe_pk = Env.get('STRIPE_PK')
    const user = {
      email: params.email,
      managed_user_id: params.managed_user_id,
      token: params.token
    }
    const email = params.email
    const userObj = session.all()
    var session = session.all()

    try {
      let loggedInUser = await auth.getUser()
      const created = loggedInUser.created
      const subscribed = loggedInUser.subscribed
      const stripeId = loggedInUser.stripe_id
      if (created === 1 && subscribed === 1) {
        return response.redirect('/dashboard')
      }
      return view.render('auth.register', { user: user, todayDate, yearDate, loggedInUser, userObj, stripe_pk: stripe_pk, session, user, created, subscribed, stripeId })
    } catch (e) {
      console.log(e)
      return view.render('auth.register', { user: user, todayDate, yearDate, userObj, stripe_pk: stripe_pk, session, user })
    }
  }

  // Show our registration page for an accountability partner.
  async showRegisterPartner ({ view, params, session, auth, response }) {
    const stripe_pk = Env.get('STRIPE_PK')
    var requestee_email = new Buffer(params.email, 'base64').toString('ascii')

    const token = hashids.decode(params.token)
    const user = {
      email: requestee_email,
      managed_user_id: token[0]
    }
    console.log(`user ${JSON.stringify(user)}`)
    const userObj = session.all()
    var session = session.all()
    try {
      let loggedInUser = await auth.getUser()
      const created = loggedInUser.created
      const subscribed = loggedInUser.subscribed
      const stripeId = loggedInUser.stripe_id
      if (created === 1 && subscribed === 1) {
        return response.redirect('/dashboard')
      }
      return view.render('auth.register-partner', { user: user, todayDate, yearDate, loggedInUser, userObj, stripe_pk: stripe_pk, session, user, created, subscribed, stripeId })
    } catch (e) {
      console.log(e)
      console.log('show partner register')

      return view.render('auth.register-partner', { user: user, todayDate, yearDate, userObj, stripe_pk: stripe_pk, session, user })
    }
  }

  // Process registration for an accountability partner
  async postPartner ({request, session, response}) {
    const userInfo = request.only(['name', 'email', 'password', 'password_confirmation'])
    const managed_user = request.only('managed_user_id')
    const managed_id = managed_user.managed_user_id
    const rules = {
      name: 'required|max:255',
      email: 'required|email|max:255|unique:users',
      password: 'required|min:6|max:30',
      password_confirmation: 'required_if:password|min:6|max:30|same:password'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    const data = {
      email: userInfo.email
    }

    // const isResetOkay = await users.userResetPasswordExists(data)
    const newUser = await users.register(userInfo, '', 'viewer')
    const partner = new Partner()
      // Managed id is not properly being stored.
    partner.managed_user_id = managed_id
    partner.user_id = newUser.id

    await partner.save(partner)
    await Database
        .raw(`DELETE FROM partner_requests WHERE requester_id = ${managed_id} AND requestee_email = '${newUser.email}'`)
      // await users.deleteResetToken(data)
    response.send(newUser.id)
    response.redirect('/login')
  }

  // Process registration for a regular user
  async postRegister ({request, session, response, view, auth}) {
    const userInfo = request.only(['name', 'email', 'password', 'password_confirmation', 'gender'])
    const dob = request.only(['day', 'month', 'year'])
    const managed_id = request.only('managed_user_id')
    const token = request.only('token')
    const rules = {
      name: 'required|max:255',
      email: 'required|email|max:255|unique:users',
      password: 'required|min:6|max:30',
      password_confirmation: 'required_if:password|min:6|max:30|same:password'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])
       return response.redirect('back')
    }


      const data = {
        email: userInfo.email,
        token: token.token
      }

      const exists = await stripe.customers.list({
        email: userInfo.email
      })


      if(exists.data.length === 0) { //If customer does not exist in stripe, create them
          const customer = stripe.customers.create({
            email: userInfo.email,
          })

        const stripeId = await customer //Get our stripe id
        const newUser = await users.register(userInfo, stripeId.id)

        response.send(newUser.id)
       Mail.send('email.newuser', {
       }, (message) => {
           message.to(userInfo.email, userInfo.name)
           message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
           message.subject('Welcome to Enxo')
         })
       await users.login(userInfo, auth)
       session.put('userCreated', true)
         return response.redirect('back')
      } else {//User exists in stripe

        const newUser = await users.register(userInfo, exists.data[0].id)

        Mail.send('email.newuser', {
        }, (message) => {
         message.to('mkcnrd@gmail.com', userInfo.name)
         message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
         message.subject('Welcome to Enxo')
       })
        await users.login(userInfo, auth)
        session.put('userCreated', true)
        return response.redirect('back')
      }
  }
  async logout ({ auth, response, session }) {
    await auth.logout()
    session.clear()
    response.redirect('/login')
  }
}

module.exports = AuthController
