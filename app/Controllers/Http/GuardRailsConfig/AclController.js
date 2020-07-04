'use strict'
const Drive = use('Drive')
const configs = '/var/log/guardrails/configs/'

class AclController {


	//List our ACL file
	async list ({ auth, request, response, view }) {
		const mainAcl = await Drive.get('/var/log/guardrails/configs/acls.conf', 'utf-8')
		const blockImageAcl = await Drive.get(configs + 'block-image-users.conf', 'utf-8')

		var headers = [0, 1, 2, 3]


		return response.send(headers.length)
		// return response.send(csvJSON(blockImageAcl))
		// return view.render('guardrails.config.list', {mainAcl, blockImage: JSON.stringify(blockImageAcl)})
	}

	async edit ({ auth, request, response, view }) {

		const file = await request.only(['config'])
		console.log('hello' + file.config)
		await Drive.put('/var/log/guardrails/configs/acls.conf', file.config)
		
		return response.redirect(back)


	}
}

module.exports = AclController
