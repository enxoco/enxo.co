'use strict'

const User = use('App/Models/User')
const Partner = use('App/Models/Partner')
const Device = use('App/Models/Device')
const UsersProfile = use('App/Models/UsersProfile')
const Hash = use('Hash')
const randtoken = require('rand-token')
const Database = use('Database')
const Env = use('Env')
const moment = require('moment')
const cloudinary = require('cloudinary').v2
const Hashids = require('hashids');
const hashids = new Hashids("my!123&Sus35per_Secret Hash murphTastic", 38, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const shell = require('shelljs')

class UserService {
  async register (userInfo, stripe_id, user_type) {
    const user = new User()

    user.name = userInfo.name
    user.email = userInfo.email
    user.password = await Hash.make(userInfo.password)
    user.stripe_id = stripe_id
    user.created = 1
    user.user_type = user_type
    user.gender = userInfo.gender

    await user.save()
    console.log(user.id)
    shell.exec(`mysqldump -u root -p${Env.get('DB_PASSWORD')} enxo_admin > ./enxo_admin.sql && aws s3 sync ./enxo_admin.sql s3://enxo-db-backup/`)
    return user
  }



  async login (userInfo, auth) {
    const { email, password } = userInfo
    await auth.attempt(email, password)
  }

  async getUserByEmail (email) {
    const user = await User.query().where('email', email).first()
    return user
  }

  async getDeviceByUser (id) {
    const device = await Device.query().where('user_id', id)
    return device
  }

  async getUserById (id) {
    const user = await User.query().where('id', id).first()
    return user
  }

  async getPartnerByIdSingle(id) {
    const user = await Partner.query().where('user_id', id).first()
    return user
  }

  async getPartnersById(id) {
    const user = await Partner.query().where('managed_user_id', id).select('user_id')
    return user
  }



  async getPartnersName(id) {
    const user = await User.query().where('id', id).select('name')
    return user
  }

  async findOrCreatePwReset (user) {
    await Database.table('password_resets').where('email', user.email).delete()
    const token = await this.getToken()
    await Database.table('password_resets').insert({
      email: user.email,
      token: token,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })

    return token
  }

  //Use method for existing users
  async findOrCreateToken (user) {
    await Database.table('password_resets').where('email', user.email).delete()
    const token = await this.getToken()
    const managed_id = hashids.decode(user.managed_user_id)
    const user_id = hashids.decode(user.id)
   console.log('user id-' + user.id + 'managedid-' + user.managed_user_id)
   if(user.id) {
    await Database.table('password_resets').insert({
      email: user.email,
      token: token,
      requester_id: user_id,
      name: user.name,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
   }
    if(user.managed_user_id) {
console.log('helo')
    await Database.table('password_resets').insert({
      email: user.email,
      token: token,
      requester_id: user.managed_user_id,
      name: user.name,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
   }



    return token
  }


  async sendAccRequestNewUser (user) {
    await Database.table('password_resets').where('email', user.email).delete()
    const token = await this.getToken()
    console.log(`dump the user object ${JSON.stringify(user)}`)
    const managed_id = hashids.decode(user.managed_user_id)
    const user_id = hashids.decode(user.id)
   if(user.id) {
    await Database.table('password_resets').insert({
      email: user.email,
      token: token,
      requester_id: user_id,
      name: user.name,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
   }
    if(user.managed_user_id) {
console.log('helo')
    await Database.table('password_resets').insert({
      email: user.email,
      token: token,
      requester_id: user.managed_user_id,
      name: user.name,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
   }



    return token
  }


  async getToken () {
    return randtoken.generate(24)
  }

  async userResetPasswordExists (postData) {
    console.log('Post data' + postData.email)
    const token = await Database.table('password_resets').where({'email': postData.email, 'token': postData.token}).first()
    if (token != null) {
      const isPast = await this.tokenExpired(token)
      return token && !isPast
    }
    return false
  }

  async tokenExpired (token) {
    let expires = Env.get('TOKEN_EXPIRES', 60) // in mins
    return moment().isAfter(moment(token.created_at).add(expires, 'minutes'))
  }

  async deleteResetToken (postData) {
    await Database.table('password_resets').where({'email': postData.email, 'token': postData.token}).delete()
  }

  async resetPassword (postData) {
    const user = await User.query().where('email', postData.email).first()
    if (user != null) {
      user.password = await Hash.make(postData.password)
      await user.save()

      await this.deleteResetToken(postData)
    }
    return user
  }

  async updateUserProvider (userData, provider, id) {
    const existingUser = await User.find(id)

    const profile = new UsersProfile()
    profile.provider = provider
    profile.provider_id = userData.getId()
    profile.oauth_token = userData.getAccessToken()
    profile.oauth_token_secret = userData.getTokenSecret()

    await existingUser.profile().save(profile)
  }

  async findOrCreateUser (userData, provider) {
    const profile_ = await UsersProfile.query()
      .where({'provider': provider, 'provider_id': userData.getId()}).first()
    if (!(profile_ === null)) {
      const realUser = await profile_.user().fetch()
      return realUser
    }

    const user_ = new User()
    user_.name = userData.getName()
    user_.username = userData.getNickname()
    user_.avatar = userData.getAvatar()
    user_.email = userData.getEmail()
    await user_.save()

    const profile = new UsersProfile()
    profile.provider = provider
    profile.provider_id = userData.getId()
    profile.oauth_token = userData.getAccessToken()
    profile.oauth_token_secret = userData.getTokenSecret()
    await user_.profile().save(profile)

    return user_
  }

  async findUserById (id) {
    const user = await User.find(id)
    return user
  }

  async updateUserProfile (loginID, userData) {
    const user = await User.find(loginID.id)
    user.email = userData.email
    user.name = userData.name
    user.username = userData.username
    user.gender = userData.gender
    user.location = userData.location
    user.website = userData.website

    await user.save() // update sql
  }

  async saveAvatar (loginID, avatarUrl) {
    const user = await User.find(loginID.id)
    user.avatar = avatarUrl

    await user.save() // update sql
  }

  async changeUserPassword (loginID, userData) {
    const user = await User.find(loginID.id)
    user.password = await Hash.make(userData.password)

    await user.save() // update sql
  }

  async getAllLinkedAccount (loginID) {
    const loggedinUser = await this.findUserById(loginID.id)
    const userProfile = await loggedinUser.profile().fetch()
    return userProfile.toJSON().map(function (profile) {
      return profile.provider
    })
  }

  async unlinkAccount (provider, loginID) {
    const userProfile = await UsersProfile.query().where({provider: provider, user_id: loginID.id}).first()
    await userProfile.delete()
  }

  async deleteUser (loginID) {
    const userProfile = await UsersProfile.query().where({user_id: loginID.id}).first()
    const user = await User.find(loginID.id)
    if (userProfile) {
      await userProfile.delete()
      await user.delete()
    } else {
      await user.delete()
    }
  }

  uploadToCloudinary (tmpPath) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(tmpPath, {}, (err, image) => {
        console.log('** File Upload')
        if (err) {
          return reject(err)
        }
        console.log("* public_id for the uploaded image is generated by Cloudinary's service.")
        return resolve(image)
      })
    })
  }
}

module.exports = UserService
