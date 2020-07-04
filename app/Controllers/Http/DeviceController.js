'use strict'
const Device = use('App/Models/Device')
const User = use('App/Models/User')
const fs = require('fs')
const Database = use('Database')
const Hashids = require('hashids')

class DeviceController {

  async remove ({ params, response }) {
    const id = params.id
    const remove = await Database
      .table('devices')
      .where('id', id)
      .delete()

    if (remove) {
      return response.redirect('back')
    }
  }

  async index ({ auth, request, response, view }) {
    try {
      
      //Check if user is logged in.
      let user = await auth.getUser()
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

      const allUsers = await Database
        .from('devices')
        .select('users.name','devices.serial_number','devices.id', 'devices.device_type', 'devices.password')
        .innerJoin('users', 'users.id', 'devices.user_id')


      try {
            const curUser = await auth.getUser()


                  const device = await Device.all()


                  function getBannedList() {
                    const bannedsearchTerms = []

                    var lineReader = require('readline').createInterface({
                      input: require('fs').createReadStream('/var/log/redwood/bannedsearchterms')
                    });

                    lineReader.on('line', function (line) {
                     bannedsearchTerms.push(line)
                    });

                    lineReader.on('close', function () {
                    })
                  }

                  getBannedList()
                    
                 if (id.id === 1) {
                  const devices = device.toJSON()
                  const passwords = []

                  for(var i=0; i<devices.length; i++) {
                    var hashids = new Hashids("Its the End of the World as we Know it", 18, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
                    var dId = hashids.encode(devices[i].id);
                    passwords.push(dId)
                  }


                  console.log(users)
                  return view.render('device.list', {devices: allUsers, curUser: curUser, passwords: passwords})
                 } else {
                 return view.render('device.list', {devices: users, curUser: curUser})  

                 }



          } catch (e) {
                        console.log('error', e)
                        return view.render('api.instagram', { usernames: [], userById: {}, myRecentMedia: {} })
                      }
        } catch (e) {
                      console.log(e)
                      response.redirect('/login')
                    }

  }

  async searches ({ auth, request, response, view, params }) {

  		const user = params.user
  		const severity = params.severity

  		if (severity === 'Explicit') {
  		  	var csv = fs.readFileSync('/var/log/redwood/tagged_searches', 'utf-8')

  		} else if (severity === 'All') {
  			var csv = fs.readFileSync('/var/log/redwood/all_searches', 'utf-8')

  		} else {
  			return
  		}
		//var csv is the CSV file with headers
    function csvJSON(csv){

      var lines=csv.split("\n");

      var result = [];

      var headers=lines[0].split(",");

      for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
        if (currentline.includes(user)) {
          if(currentline[2].length < 3) {
          } else {
            result.push(obj);

          }

        }

      }
      
      //return result; //JavaScript object
      return result; //JSON
    }

  	    	return view.render('reports/index', {searches: csvJSON(csv), user: user, severity: severity})
  }
}

module.exports = DeviceController


