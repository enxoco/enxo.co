'use strict'

const Model = use('Model')

class ReportUser extends Model {
  
  devices () {
    return this.hasMany('App/Models/Device')
  }
}

module.exports = ReportUser
