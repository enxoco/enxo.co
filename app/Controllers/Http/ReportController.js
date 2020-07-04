'use strict'
const Drive = use('Drive')
const moment = require('moment')
var Hashids = require('hashids');
var hashids = new Hashids("my!123&Sus35per_Secret Hash murphTastic", 38, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const shell = require('shelljs')


class ReportController {




	async weeklyUserReport ({ request, response, auth, view, params }) {

	const week = params.week
	var user = hashids.decode(params.user)

	const reports = shell.exec(`cat /var/log/guardrails/saved-reports/topHits/20/${week}.json /var/log/guardrails/saved-reports/searches/20/${week}.json /var/log/guardrails/saved-reports/blocks/20/${week}.json`)

	console.log('reports ' + reports)

	if(reports === false) {
		response.json('[]')
	} else {
		response.json(JSON.parse(reports))
	}
}

		async reportsJSON ({ request, response, auth, view, params }) {
			const week = params.week
			var user = hashids.decode(params.user)
			const string = `/var/log/guardrails/saved-reports/${user}/${week}.json`

			try {
				const file = await Drive.get(string, 'utf-8')
				response.json(file)
			} catch(error) {
				response.json()
			}


		}

		async fullTopHits ({ request, response, auth, view, params }) {

		const week = params.week
		var user = hashids.decode(params.user)
		const string = '/var/log/guardrails/saved-reports/topHits/' + user + '/' + week + '.json'
		const exists = await Drive.exists(string)

		if(exists === false) {
			response.json('[]')
		} else {
			const file = await Drive.get(string, 'utf-8')
			response.json(file)
		}
	}

		async explicitSearches ({ request, response, auth, view, params }) {

		const week = params.week
		var user = hashids.decode(params.user)

		const string = '/var/log/guardrails/saved-reports/searches/explicit/' + user + '/' + week + '.json'
		const exists = await Drive.exists(string)
		if(exists === false) {
			response.json('[]')
		} else {
			const file = await Drive.get(string, 'utf-8')
			response.json(file)
		}

	}

		async blockedSites ({ request, response, auth, view, params }) {

		const week = params.week
		var user = hashids.decode(params.user)


		const string = '/var/log/guardrails/saved-reports/blocks/explicit/' + user + '/' + week + '.json'
		const exists = await Drive.exists(string)
		if(exists === false) {
			response.json('[]')
		} else {
			const file = await Drive.get(string, 'utf-8')
			response.json(file)
		}

	}
}

module.exports = ReportController
