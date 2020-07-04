'use strict'
const Feedback = use('App/Models/Feedback')
const Database = use('Database')
const Mail = use('Mail')
const moment = require('moment')

const now = moment().format('YYYY-MM-DD HH:mm:ss')

class FeedbackController {

	async contactFormPost ({ auth, request, response }) {
		
		const form = await request.all()

		const save = await Database
			.table('feedback')
			.insert({created_at: now, updated_at: now, name: form.name, email: form.email, message: form.message})

	}
}

module.exports = FeedbackController
