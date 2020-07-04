'use strict'
const shell = require('shelljs')
const Database = use('Database')
const users = make('App/Services/UserService')
const Env = use('Env')
const dashboard = use('App/Models/Meraki')(Env.get('SM_API'))
const Drive = use('Drive')
const Hashids = require('hashids')
const hashids = new Hashids('my!123&Sus35per_Secret Hash murphTastic', 38, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890')



class MerakiController {

	async updateTags({ request, response }) {
		var req = require("request")
		var params = request.all()
		var options = { method: 'PUT',
		  url: `https://n168.meraki.com/api/v0/networks/${Env.get('SM_NID')}/sm/devices/tags`,
		  headers:
		   { 'Content-Type': 'application/json',
		     'X-Cisco-Meraki-API-KEY': `${Env.get('SM_API')}` },
		  body:
		   { ids: params.id,
		   	 updateAction: params.updateAction,
		     tags: params.tags
		   },
		  json: true };
			req(options, function (error, response, body) {
		  if (error) throw new Error(error);

		});
			return response.send(params.action)

		}


	async toggleACL({ request, response, view }) {
		const req = request.all()
		const aclPath = '/etc/guardrails/acls'
		const aclName = req.aclName
		const device = req.deviceId

		const file = await Drive.get(`${aclPath}/${aclName}-users.conf`, 'utf-8')
		if(file.includes(device)) {
				//If this device exists in the list, delete it
				shell.exec(`sed -i -e /${device}/d -e /^$/d ${aclPath}/${aclName}-users.conf && curl -X POST http://guardrails.lxd:6502/reload -H 'Authorization: Basic TWlrZUNvbnJhZF9pUGhvbmU6cGFzc3dvcmQ='`)

			} else {
				await Drive.append(`/etc/guardrails/acls/${aclName}-users.conf`, `\nacl ${aclName}-users user-name ${device}`)
				shell.exec(`curl -X POST http://guardrails.lxd:6502/reload -H 'Authorization: Basic TWlrZUNvbnJhZF9pUGhvbmU6cGFzc3dvcmQ='`)
			}

			return response.send('done')

	}

	async list({ request, response, auth, params, view })	 {

	const req = request.post()
	const user = await hashids.decode(req.userId)

	let loginID = await auth.getUser()


	const testing = await dashboard.sm.userDevices(Env.get('SM_NID'), req.id)
    let loggedinUser = await users.findUserById(user)
    let linkedAccount = await users.getAllLinkedAccount(loginID)
		const devices = await dashboard.sm.userDevices(Env.get('SM_NID'), loggedinUser.email)

		// const devices = await Database
		// 	.from('devices')
		// 	.select('id', 'serial_number', 'device_type')
		// 	.where('user_id', loggedinUser.id)

			const curDevice = devices.devices[0]

	const devArr = []
	for(var i = 0; i < devices.length; i++) {
		devArr.push({
			name: devices[i].device_type,
			id: devices[i].id
		})
	}

// return response.send(devArr)
	return view.render('layout/partials/devicerestrictions', {
		curDevice,
		name: loggedinUser.name,
		devArr,
		user: hashids.encode(loggedinUser.id),
		device: curDevice
	})

	}


}

module.exports = MerakiController
