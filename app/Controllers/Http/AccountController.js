'use strict'
const Database = use('Database')

const { validateAll } = use('Validator')
const users = make('App/Services/UserService')
const Partner = use('App/Models/Partner')
const User = use('App/Models/User')
const Device = use('App/Models/Device')
const Env = use('Env')
const Hashids = require('hashids');
const hashids = new Hashids('my!123&Sus35per_Secret Hash murphTastic', 38, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
const dashboard = use('App/Models/Meraki')(Env.get('SM_API'));
const moment = require('moment');
const Mail = use('Mail')
const Drive = use('Drive')

class AccountController {
  async csvJSON (csv) {
    var lines = csv.split('\n')

    var result = []

    var headers = lines[0].split(',')

    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {}
      var currentline = lines[i].split(',')
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j]
      }
      result.push(obj)
    }
    return result
  }

  async index ({ view, response, auth }) {
    try {
      let loginID = await auth.getUser()
      if (loginID) {
        return response.redirect('dashboard')
      } else {}
    } catch (e) {
      return view.render('welcome')
    }
  }

  async orgPlanPage ({ view, response }) {
    return view.render('orgplan')
  }

  async showPrivacyPage ({ view, response }) {
    return view.render('layout.privacy-full')
  }

  async clearSession ({ session }) {
    session.clear()
  }

  // Edit profile
  async edit ({ auth, view, response }) {
    try {
      let loginID = await auth.getUser()
      let loggedinUser = await users.findUserById(loginID.id)
      let linkedAccount = await users.getAllLinkedAccount(loginID)
      var page = 'profile'
      return view.render('account.profile', {
        account: loggedinUser,
        linkedAccount: linkedAccount,
        gender: loginID.gender,
        userType: loginID.user_type,
        user: hashids.encode(loginID.id),
        page
      })
    } catch (e) {
      response.redirect('/login')
    }
  }

    // Create one single route/method to render all of our device setup pages.
    // Must pass in device type as request param
  async showDeviceSetup ({ auth, view, response, params }) {
    var route = 'device.' + params.device_type + '.setup'

    try {
      let loginID = await auth.getUser()
      let loggedinUser = await users.findUserById(loginID.id)

      return view.render(route, {
        account: loggedinUser,
        name: loginID.name,
        page: 'setup',
        userType: loginID.user_type
      })
    } catch (e) {
      response.redirect('/login?ref=device.setup')
    }
  }

  async showDeviceRestrictions ({ auth, view, response }) {
    try {
      let loginID = await auth.getUser()
      let loggedinUser = await users.findUserById(loginID.id)
      return view.render('device.restrictions', {account: loggedinUser, name: loginID.name})
    } catch (e) {
      response.redirect('/login')
    }
  }

  async listDevices ({ request, response, auth }) {
    let loginID = await auth.getUser()
    let id = await hashids.decode(request.all().id)
    let user = await users.findUserById(id)
    const devices = await dashboard.sm.userDevices(Env.get('SM_NID'), user.email)
      const dbDevices = await Database
        .from('devices')
        .select('id', 'serial_number', 'device_type')
        .where('user_id', id)
      
    if (devices.devices.length !== 0) {
      const deviceList = {
        editable: true,
        devices: dbDevices
      }
      return response.send(deviceList)
    } else {
      const deviceList = []
    }
    return response.send(deviceList)
  }

    // When a user login is posted, user is redirected to this route
  async showDashboard ({ auth, view, response, session, request }) {
    if(Env.get('NODE_ENV') === 'development') {
        // session.put('adonis-auth', 103)
    }

    try {
      let loginID = await auth.getUser()
      var id = hashids.encode(loginID.id)
      const userType = loginID.user_type
      const created = loginID.created

        // This will give us the id of the users we are accountable to.
      let accountableToIds = await users.getPartnersById(loginID.id)

      const accountableTo = Database
        .from('partners')
        .where('managed_user_id', loginID.id)
        .select('user_id')

      const pendingPartners = await Database
        .from('partner_requests')
        .select('requestee_email')
        .where('requester_id', loginID.id)

      const managed_user_id = Database
        .from('partners')
        .where('user_id', loginID.id)
        .select('managed_user_id')


          const partners = await Database
            .from('users')
            .select('users.id AS userId', 'users.name')
            .whereIn('users.id', managed_user_id)

            const myPartners = await Database
              .from('users')
              .select('users.name', 'users.avatar')
              .innerJoin('partners', 'users.id', 'partners.user_id')
              .where('partners.managed_user_id', loginID.id)




      const devices = await Database
        .from('devices')
        .where('user_id', loginID.id)
        .select('device_type', 'serial_number', 'id')

      if (Env.get('NODE_ENV') === 'production') {
        if (loginID.id === 1) {
          const all = await Database
              .from('devices')
              .select('users.id as userId', 'users.name')
              .innerJoin('users', 'users.id', 'devices.user_id')
              .distinct('users.id')
              .orderBy('users.name', 'asc')

          for (var x = 0; x < all.length; x++) {
            all[x].userId = hashids.encode(all[x].userId)
          }
          return view.render('device/report', {
            allUser: all,
            user: all[0].userId,
            name: all[0].name,
            devices,
            myID: id,
            toPartners: myPartners
          })
        }
      }
        // const testing = await dashboard.sm.userDevices(Env.get('SM_NID'), loginID.email)
        const step1 = await session.get('step1')

        for(var x = 0; x < partners.length; x++) {
            partners[x].userId = hashids.encode(partners[x].userId);
        }
        var page = 'dashboard'
        if(userType === 'subscriber') {
          partners.unshift({userId: id, name: loginID.name})

          var loggedInUser = []
          loggedInUser.push(hashids.encode(loginID.id))
          loggedInUser.push(loginID.user_type)

          //Show invite card and add devices for users with no devices
          if(devices.length === 0 && partners.length === 1) {
            return view.render('account/dashboard', {
              userType,
              myID: id

            })

          } else {
            return view.render('device/report', {
              allUser: partners,
              user: partners[0].userId,
              name: partners[0].name,
              devices,
              userType,
              pendingPartners,
              loggedInUser,
              myID: id,
              toPartners: myPartners

            })
          }


        }
        if(userType === 'viewer') {
          console.log(`this users devices ${devices}`)
          return view.render('device/report', {
            allUser: partners,
            userType,
            loggedInUser: hashids.encode(loginID.id),
            myID: id,
            devices

          })
        }
        return response.redirect('/dashboard')
    } catch (error) {
      if(error.code === 'E_INVALID_SESSION') {
        console.log(`error ${error}`)
        return response.redirect('/login')

      }
      console.log(error)
    }

  }


  async update ({ request, session, response, auth }) {
    const userInfo = request.only(['email', 'name', 'username', 'gender', 'location', 'website'])
    const rules = {
      name: 'required|max:255',
      email: 'required|email|max:255'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

      return response.redirect('back')
    }

    try {
      const loginID = await auth.getUser()
      await users.updateUserProfile(loginID, userInfo)
      session.flash({ status: 'Your Profile has been updated successfully' })
      return response.redirect('back')
    } catch (e) {
      session.flash({ error: 'Error while updating profile' })
      return response.redirect('back')
    }
  }

  /**
   * Avatar upload using cloudinary(https://www.cloudinary.com)
   */
  async uploadAvatar ({ request, session, response, auth }) {
    const profilePic = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })

    if (Object.keys(profilePic.error()).length !== 0) {
      session.flash({ error: 'Invalid File type' })
      return response.redirect('back')
    }

    try {
      const cloudinaryResponse = await users.uploadToCloudinary(profilePic._tmpPath)
      const loginID = await auth.getUser()
      await users.saveAvatar(loginID, cloudinaryResponse.url)
      session.flash({status: 'Avatar has been updated successfully'})
      return response.redirect('back')
    } catch (e) {
      session.flash({ error: 'Internal error while uploading' })
      return response.redirect('back')
    }
  }

  async changePassword ({request, session, response, auth }) {
    const userInfo = request.only(['password', 'password_confirmation'])
    const rules = {
      password: 'required|min:6|max:30',
      password_confirmation: 'required_if:password|min:6|max:30|same:password'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password', 'password_confirmation'])

      return response.redirect('back')
    }

    const loginID = await auth.getUser()
    await users.changeUserPassword(loginID, userInfo)
    session.flash({ status: 'Password has been changed successfully' })
    return response.redirect('back')
  }

  async unlinkSocialMediaAccount ({ params, auth, response }) {
    const provider = params.provider
    const loginID = await auth.getUser()
    await users.unlinkAccount(provider, loginID)
    response.redirect('back')
  }

  async destroy ({ auth, response }) {
    const loginID = await auth.getUser()
    await users.deleteUser(loginID)
    await auth.logout()
    response.redirect('/')
  }

  async sendAccountabilityRequest ({ request, session, response }) {
    const userInfo = request.all()
    const rules = {
      email: 'required|email'
    }

    const validation = await validateAll(userInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const user = await users.getUserByEmail(userInfo.email)
    if (user === null) {
      session.flash({ warning: `${userInfo.email} Not Found` })
      return response.redirect('back')
    } else {
      const token = await users.findOrCreateToken(user)
      try {
        response.send({user: user, token:token})
        await this.sendResetMail(user, token)
        session.flash({status: 'We have e-mailed your password reset link!'})
        return response.redirect('back')
      } catch (error) {
        session.flash({ error: 'Unable to deliver email to given email address' })
        return response.redirect('back')
      }
    }
  }




}

module.exports = AccountController
