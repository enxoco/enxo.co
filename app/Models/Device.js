'use strict'

const Model = use('Model')

class Device extends Model {

	partner () {
		return this.belongsTo('App/Models/Partner')
	}

	user () {
		return this.hasOne('App/Models/User', 'id', 'user_id')
	}

}

module.exports = Device

