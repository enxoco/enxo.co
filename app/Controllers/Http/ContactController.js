'use strict'
const { validateAll } = use('Validator')
const Mail = use('Mail')
const fs = require('fs')
const stream = require('stream')

class ContactController {
  async index ({ request, response, view, auth }) {
    try {
      // console.log(await auth.getUser())
    } catch (error) {
      console.log('You are not logged in')
      response.redirect('/login')
    }
    return view.render('contact.index')
  }

  async sendMessage ({ request, session, response}) {
    const mesgInfo = request.only(['name', 'email', 'message'])
    const rules = {
      name: 'required|min:3',
      email: 'required|email|max:255',
      message: 'required'
    }

    const validation = await validateAll(mesgInfo, rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    await Mail.send('mail.contacttemplate', {
      body: mesgInfo.name + ' ' + mesgInfo.message + ' ' + mesgInfo.email
    }, (message) => {
      message.to('mike@enxo.co')
      message.from('mike@enxo.co', mesgInfo.name)
      message.subject('Message From Enxo contact form - ' + mesgInfo.email)
    })

    session.flash({ status: 'Your Message has been sent successfully' })
    return response.redirect('back')
  }
}

module.exports = ContactController
