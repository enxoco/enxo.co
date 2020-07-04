'use strict'
const Database = use('Database')
const Drive = use('Drive')
const moment = require('moment')
const Mail = use('Mail')
const Env = use('Env')
const partners = make('App/Services/UserService')
const shell = require('shelljs')

const logPath = '/var/log/guardrails/'
class ApiReportGenerateController {

	async welcomePartnerEmail ({params, response, view}) {
			 Mail.send('email.welcomepartner', {
			 }, (message) => {
		       message.to('mkcnrd@gmail.com', 'Grant Stafford')
		       message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
		       message.subject('Welcome to Enxo!')
		     })
	}

	async sendReportToUser ({ params, response, auth, view }) {
				const user = params.user
		const weekSelected = params.week


			const userObj = await Database
				.from('devices')
				.select('users.name', 'users.email')
				.innerJoin('users', 'users.id', 'devices.user_id')
				.where('devices.user_id', user)

	    const start = moment().subtract(weekSelected, 'weeks').startOf('isoWeek').format('YYYY-MM-DD')
	    const end = moment().subtract(weekSelected, 'weeks').endOf('isoWeek').format('YYYY-MM-DD')

	    const week = moment().subtract(weekSelected, 'weeks').startOf('isoWeek').format('MMM Do') + ' - ' + moment().subtract(weekSelected, 'weeks').endOf('isoWeek').format('MMM Do')



			var results = JSON.parse(await Drive.get(`/var/log/guardrails/saved-reports/${user}/${weekSelected}.json`, 'utf-8'))
			// Loop over our array of accountability partners and send each one an email
			if(Env.get('NODE_ENV') === "development") {

				console.log(`sending email to ${userObj[0].email}`)
				Mail.send('email.report', {
				topHits: results.topHits.slice(1,21),
				blocks: results.blocks,
				searches: results.searches,
				user: userObj[0],
				week: week
			 }, (message) => {
					 message.to(userObj[0].email, userObj[0].name)
					 message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
					 message.subject(`Your weekly Enxo Report`)
				 })


			}
	}
	async testReport ({params, response, auth, view}) {
		const user = params.user
		const weekSelected = params.week

	    const users = await Database
	        .from('users')
	        .where('users.id', user)
	        .select('users.id AS user_id', 'users.name','devices.serial_number','devices.id AS device_id', 'devices.device_type', 'devices.password')
	        .innerJoin('devices', 'devices.user_id', 'users.id')
	        //.limit(1)
	    const partners = await Database
	    	.from('partners')
	    	.where('managed_user_id', users[0].user_id)
	    	.innerJoin('users', 'partners.user_id', 'users.id')
	    	.select('email', 'name', 'receives_email')
	    const start = moment().subtract(weekSelected, 'weeks').startOf('isoWeek').format('YYYY-MM-DD')
	    const end = moment().subtract(weekSelected, 'weeks').endOf('isoWeek').format('YYYY-MM-DD')

	    const week = moment().subtract(weekSelected, 'weeks').startOf('isoWeek').format('MMM Do') + ' - ' + moment().subtract(weekSelected, 'weeks').endOf('isoWeek').format('MMM Do')



			var results = JSON.parse(await Drive.get(`/var/log/guardrails/saved-reports/${user}/${weekSelected}.json`, 'utf-8'))
			// Loop over our array of accountability partners and send each one an email
			if(Env.get('NODE_ENV') === "development") {

				for (var i = 0; i < partners.length; i++) {
					if(partners[i].receives_email === 0) {
						return response.send(`No emails for ${partners[i].name}`)
					}
					return view.render('email.report', {
						topHits: results.topHits.slice(1,21),
						blocks: results.blocks.slice(1,21),
						searches: results.searches,
						user: users[0],
						week: week,
						//to: partners[1].name,
						// from,

					})
				}


			} else {

				//Send email to each user
				Mail.send('email.report', {
				topHits: results.topHits.slice(1,21),
				blocks: results.blocks,
				searches: results.searches,
				user: users[0],
				week: week
			 }, (message) => {
					 message.to(users[0].email, users[0].name)
					 message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
					 message.subject(`Your weekly Enxo Report`)
				 })

				for (var i = 0; i < partners.length; i++) {
					if(partners[i].receives_email === 0) {
						return response.send(`No emails for ${partners[i].name}`)
					} else {
							Mail.send('email.report', {
		 					topHits: results.topHits.slice(1,21),
		 					blocks: results.blocks,
		 					searches: results.searches,
		 					user: users[0],
		 					week: week
		 				 }, (message) => {
		 						 message.to(partners[i].email, partners[i].name)
		 						 message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
		 						 message.subject(users[0].name+ '\'s Enxo Report')
		 					 })
					}

				}
			}
		return response.send("something")
	}

}



module.exports = ApiReportGenerateController
