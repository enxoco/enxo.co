'use strict'
const users = make('App/Services/UserService')
const Partner = use('App/Models/Partner')
const PartnerRequest = use('App/Models/PartnerRequest')
const Mail = use('Mail')
const Env = use('Env')
const Database = use('Database')
const Hashids = require('hashids')
const hashids = new Hashids('my!123&Sus35per_Secret Hash murphTastic', 38, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')

class RequestController {
  async existsTrue (user) {
  // User exists so we need to send them an email with a link to accept or deny
    console.log(user)
  }

  async createRelationship ({ auth, request, session, response, view, params }) {
    const partner = new Partner()
    partner.managed_user_id = hashids.decode(params.managed_user_id)
    partner.user_id = hashids.decode(params.partner_id)

    const exists = await Database
      .from('partners')
      .where('user_id', hashids.decode(params.partner_id))
      .andWhere('managed_user_id', hashids.decode(params.managed_user_id))
      .select('*')

    if (exists.length > 0) {
      await Database
        .raw(`DELETE FROM partner_requests WHERE requester_id = ${partner.managed_user_id} AND requestee_email = ${params.email}`)
      session.flash({ error: 'You are already an accountability partner' })
      return response.redirect('back')
    } else {
      await Database
        .raw(`DELETE FROM partner_requests WHERE requester_id = ${partner.managed_user_id} AND requestee_email = ${params.email}`)
      await partner.save(partner)
      session.put('adonis-auth', params.partner_id)
      session.flash({ success: 'You are now an accountability partner' })
      return response.redirect('/dashboard')
    }
  }

  // This method is for adding an accountability partner that is already a registered user.
  async createRelationshipExisting ({ session, response, view, params }) {
    const partner = new Partner()
    const token = hashids.decode(params.token)
    partner.managed_user_id = token[1]
    partner.user_id = token[0]

    await Database
      .raw(`DELETE FROM partner_requests WHERE requester_id = ${partner.managed_user_id} AND requestee_id = ${partner.user_id}`)
    await partner.save(partner)
    session.put('adonis-auth', params.partner_id)
    session.flash({ success: 'You are now an accountability partner' })
    return response.redirect('/dashboard')
  }

  // This method will handle sending an email to a person who has been requested to be an accountability partner
  async request ({ auth, request, session, response, view, params }) {
    const partnerRequest = new PartnerRequest()
    const id = await auth.getUser()
    const userInfo = request.all()
    userInfo.managed_user_id = hashids.decode(userInfo.managed_user_id)
    const user = await users.getUserByEmail(userInfo.email)
    const toName = request.all().name
    const fromName = id.name

    if (user) { // User does exist, send them an email with accept/decline link
      partnerRequest.requester_id = id.id
      partnerRequest.requestee_id = user.id
      partnerRequest.requestee_email = user.email
      partnerRequest.save()
      let link = `${Env.get('APP_URL')}/partner/add/${hashids.encode(user.id, id.id)}`
      await Mail.send('email.request.link', {
        link,
        toName,
        fromName
      }, (message) => {
        message.to(user.email, user.name)
        message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
        message.subject('Accountability request')
      })
      session.flash({status: 'We sent ' + toName + ' an invitation for you!'})
      return response.redirect('back')
    } else { // User does not exist, need to send them an email with the users credentials attached. registration page with users credentials.
      // URL should be in the form of partner/register/{token}/{email}

      let data = userInfo.email
      partnerRequest.requester_id = id.id
      partnerRequest.requestee_id = 0
      partnerRequest.requestee_email = data
      partnerRequest.save()
      let buff = new Buffer.from(data).toString('base64')
      let link = `${Env.get('APP_URL')}/partner/register/${hashids.encode(id.id)}/${buff}`
      await Mail.send('email.request.link', {
        link,
        toName,
        fromName
      }, (message) => {
        message.to(userInfo.email, userInfo.name)
        message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
        message.subject('Accountability request')
      })

      session.flash({status: 'We sent ' + toName + ' an invitation for you!'})
      return response.redirect('back')
    }
  }
}

module.exports = RequestController
