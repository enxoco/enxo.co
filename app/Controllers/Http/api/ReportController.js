'use strict'
const shell = require('shelljs')
const Device = use('App/Models/Device')
const User = use('App/Models/User')
const Partner = use('App/Models/Partner')
const Database = use('Database')
const Drive = use('Drive')
const partners = make('App/Services/UserService')
const Mail = use('Mail')
const Env = use('Env')

class ApiReportController {

	//When a user clicks the feedback button on the guardrails block page, send an email to myself with the details.

	async blockPageFeedback({ request, response, view }) {
		const issues = request.all()


			 Mail.send('email.blockpagefeedback', {
				help: issues
			 }, (message) => {
		       message.to('mkcnrd@gmail.com', 'Mike')
		       message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
		       message.subject('False positive')
		     })

		     return view.render('email/blockpagefeedback')

	}


	async emailReport ({ request, response, auth, params, view }) {

		const start = params.start.replace(/-/g , "/")
		const parentFolder = start.substring(0,8)
		const startDay = start.substring(8,10)
		const end = params.end.replace(/-/g , "/")
		const endDay = end.split('/')[2]
		const userId = params.user

		const searchString = parentFolder + startDay


		const deviceIds = await Database
		  .from('devices')
		  .where('user_id', 4)
		  .select('users.name', 'devices.device_type', 'devices.id')
		  .innerJoin('users', 'users.id', 'devices.user_id')

		response.json(searchString)
		// return view.render('mail/reporttemplate')
	}

	async mail ({ request, response, auth, params, view }) {
		return view.render('mail/reporttemplate')
	}

	async index({ request, response, auth, params, view, session }) {
		var apiKey = "ab0719829f6d72ce8f614abc4459b19b7bbe93c5"
	// var dashboard = require('node-meraki-dashboard')(apiKey)

		const info = session.all()

		session.put('adonis-auth', 53)
		const devices = await Device.all()
		let id = await auth.getUser()



      const managedUsers = Database
        .from('partners')
        .where('user_id', id.id)
        .select('managed_user_id')

      const users = await Database
        .from('devices')
        .whereIn('user_id', managedUsers)
        .select('users.name','devices.serial_number','devices.id AS device_id', 'users.id AS userId', 'devices.device_type', 'devices.password')
        .innerJoin('users', 'users.id', 'devices.user_id')

      const userDevices = await Database
        .from('devices')
        .whereIn('user_id', managedUsers)
        .select('devices.id', 'devices.device_type')



	for(var i = 0; i<userDevices.length; i++) {
		if(userDevices[i].device_type.includes('iPhone')) {
			var defaultDevice = userDevices[i]
		}
	}
	// var info = await dashboard.sm.listDeviceByTags('N_657525545596096688', defaultDevice.id)

	const user = params.user //this is now an id instead of an actual username

	// the device id were looking for
	var needle = parseInt(user);

	var curUser = await partners.getUserById(needle)


	if(needle == id.id) {
      	return view.render('device/report', {name: id.name, user: params.user, session: info})
	}

	if(id.id == 1) {
		const allUser = await Database
			.from('users')
			.select('users.name', 'users.id')

      	return view.render('device/report', {name: curUser.name, user: params.user, session: info, allUser})

	}
	// iterate over each element in the array
	for (var i = 0; i < users.length; i++){
	  // look for the entry with a matching `code` value
	  if (users[i].userId == needle){
	  	return view.render('device/report', {name: users[i].name, user: params.user, devices: userDevices, defaultDevice, session: info})

      	// return view.render('device/report', {name: users[i].name, user: params.user, tags: info.devices[0], devices: userDevices, defaultDevice})

	  } else {

		}


	}
	return view.render('auth.unauthorized')

}

/* Get a report for an individual user containing the full url of sites visited */
	async userReport({ request, response, auth, params, view })	 {
	const devices = await Device.all()
	let id = await auth.getUser()



      const managedUsers = Database
        .from('partners')
        .where('user_id', id.id)
        .select('managed_user_id')

      const users = await Database
        .from('devices')
        .whereIn('user_id', managedUsers)
        .select('users.name','devices.serial_number','devices.id', 'devices.device_type', 'devices.password')
        .innerJoin('users', 'users.id', 'devices.user_id')


	const user = params.user //this is now an id instead of an actual username
	const date = params.date.replace(/-/g , "/");


	// the device id were looking for
	var needle = user;

	// iterate over each element in the array
	for (var i = 0; i < users.length; i++){
	  // look for the entry with a matching `code` value
	  if (users[i].id == needle || id.id == 1){



		var csv = shell.exec('cat /var/log/guardrails/archive/'+date+'.log | grep '+user+' | grep -Ev "disable-proxy-headers|block-invisible" |cut -f -4 -d,  | sort -u -t, -k4,4 | sed 1i"Date,Username,Action,URL" |sed \'s/"//g\' | sed -e "s/https/http/g; s/:443//g" | awk -F"," \'!seen[$2, $4]++\' | grep -Ev "ssl-bump|api.|apple.com|icloud.com|inbox.google.com|.well-known/apple-app-site-association|digicert.com|entrust.com|apple-app-site-association"' );

		function csvJSON(csv){

		  var lines=csv.split("\n");

		  var result = []

		  var headers=lines[0].split(",");

		  for(var i=1;i<lines.length-1;i++){

			  var obj = {};
			  var currentline=lines[i].split(",");

			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }
				  result.push(obj)
		  }

		  //return result; //JavaScript object
		  return result; //JSON
		}

		response.send(csvJSON(csv))
	    break;
	  } else {
	  	response.send('Sorry you are not authorized to view this reports for this user')
	  }
	}

	}


	/* Get a report for an individual user containing the full url of sites visited */
		async renderEmailTemplate({ request, response, auth, params, view })	 {
		const devices = await Device.all()
		let id = await auth.getUser()



	      const managedUsers = Database
	        .from('partners')
	        .where('user_id', id.id)
	        .select('managed_user_id')

	      const users = await Database
	        .from('devices')
	        .whereIn('user_id', managedUsers)
	        .select('users.name','devices.serial_number','devices.id', 'devices.device_type', 'devices.password')
	        .innerJoin('users', 'users.id', 'devices.user_id')


		const user = params.user //this is now an id instead of an actual username
		const start = params.start
		const end = params.end
		const limit = params.limit

		const obj = {
				'user': user,
				'start': start,
				'end': end,
				'limit': limit
		}
		console.log(id.id)
		return view.render('email.report', {obj: users})



		}

/* Get a report for an individual user containing only the TLD instead of the full url */
	async userReportDomainOnly({ request, response, auth, params, view })	 {
	const devices = await Device.all()

	const user = params.user
	const date = params.date.replace(/-/g , "/")
	var csv = shell.exec('cat /var/log/guardrails/archive/'+date+'.log | grep '+user+' | grep -Ev "disable-proxy-headers|block-invisible" | awk \'{if ($1 == "'+date+'") print $0;}\' |cut -f -4 -d,  | sort -u -t, -k4,4 | sed 1i"Date,Username,Action,URL" |sed \'s/"//g\' | sed \'s;/[^/]*;;3g\' | sed -e "s/https/http/g; s/:443//g" | awk -F"," \'!seen[$2, $4]++\' | grep -Ev "ssl-bump|api.|apple.com|icloud.com"' );

		function csvJSON(csv){

		  var lines=csv.split("\n");

		  var result = []

		  var headers=lines[0].split(",");

		  for(var i=1;i<lines.length-1;i++){

			  var obj = {};
			  var currentline=lines[i].split(",");

			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }


				  result.push(obj)


		  }

		  //return result; //JavaScript object
		  return result; //JSON
		}

		const report = console.log(csvJSON(csv))

		response.send(csvJSON(csv))
	// return view.render('device/report', {report: csvJSON(csv), user:'murph'})


	}

	async userTopHits({ request, response, auth, params, view }) {

	// const user = params.user
	// const date = params.date.replace(/-/g , "/")
	var csv = shell.exec('cat /var/log/guardrails/archive/2018/01/29.log | grep 657525545596209962 | grep -Ev "disable-proxy-headers|block-invisible" | 	cut -f -4 -d,  | sort -u -t, -k4,4 | sed 1i"Date,Username,Action,URL" |sed \'s/"//g\' | sed \'s;/[^/]*;;3g\' | sed -e "s/https/http/g; s/:443//g" | awk -F"," \'!seen[$2, $4]++\' | grep -Ev "ssl-bump|api.|apple.com|icloud.com"' );

		function csvJSON(csv){

		  var lines=csv.split("\n");

		  var result = []

		  var headers=lines[0].split(",");

		  for(var i=1;i<lines.length-1;i++){

			  var obj = {};
			  var currentline=lines[i].split(",");

			  for(var j=0;j<headers.length;j++){
				  obj[headers[j]] = currentline[j];
			  }


				  result.push(obj)


		  }

		  //return result; //JavaScript object
		  return result; //JSON
		}

		const data = csvJSON(csv)






    // getUnique();

	return view.render('device/report', {report: csvJSON(csv), user:'murph'})

	}



	async testEmail ({request, response, view}) {
		let report = await Drive.get('/home/murph/Projects/enxoERT/resources/saved-reports/MikeConrad/2018/01/21-27.json', 'utf-8')

		return view.render('auth.email.password', {report: JSON.parse(report)})
	}

	}

module.exports = ApiReportController
