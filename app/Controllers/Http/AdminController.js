'use strict'
const Device = use('App/Models/Device')
const Partner = use('App/Models/Partner')
const User = use('App/Models/User')
const Database = use ('Database')

class AdminController {

	async updateDevice({ request, response, params }) {

		
		const device = request.all()
		console.log(device)

		const updateDevice = await Database
		  .table('devices')
		  .where('id', device.deviceId)
		  .update({ user_id: device.userId, device_type: device.device_type, serial_number: device.serial_number, id: device.deviceId })

		  return response.send(device)


	}

	async show404({ request, response, view}) {


		  return view.render('404page')


	}

	async show500({ request, response, view}) {


		  return view.render('500page')


	}


	async addDevice({ request, response, params }) {

		
		const device = request.all()

		const newDevice = await Database
		  .insert({
		  	id: device.deviceId,
		  	serial_number: device.serial_number,
		  	device_type: device.device_type,
		  	user_id: device.userId
		  })
		  .into('devices')

		  return response.send(newDevice)


	}

	async listUsers ({ auth, view, response, request}) {
		let loginID = await auth.getUser()

		if(loginID.id === 1) {
		
		const users = await Database
		  .table('users')
		  .select('id', 'email', 'name')
		  .orderBy('name', 'asc')

		const devices = await Database
		  .table('devices')
		  .select('id', 'user_id', 'serial_number')

		const claimedDevices = await Database
		  .table('users')
		  .select('users.id as userId', 'users.name', 'devices.id as deviceId', 'devices.serial_number', 'devices.device_type')
		  .innerJoin('devices', 'users.id', 'devices.user_id')

	      return view.render('admin.users', {
	      	users: users, 
	      	devices: devices,
	      	claimedDevices: claimedDevices
	      })
		}


	}

	async userReports ({ auth, view, response, request}) {
		let loginID = await auth.getUser()

		if(loginID.id === 1) {
		
		const users = await Database
		  .table('users')
		  .select('id', 'email', 'name')

		const devices = await Database
		  .table('devices')
		  .select('id', 'user_id', 'serial_number')

		const claimedDevices = await Database
		  .table('users')
		  .select('users.id as userId', 'users.name', 'devices.id as deviceId', 'devices.serial_number', 'devices.device_type')
		  .innerJoin('devices', 'users.id', 'devices.user_id')

	      return view.render('admin.userreports', {
	      	users: users, 
	      	devices: devices,
	      	claimedDevices: claimedDevices
	      })
		}


	}



}

module.exports = AdminController
