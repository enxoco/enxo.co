'use strict'
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| PartnerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class PartnerSeeder {
  async run () {

 await Database.table('partners').insert([
		{
		"id": 1,
		"user_id": 2,
		"managed_user_id": 1,
		"created_at": null,
		"updated_at": null
		},
		{
		"id": 2,
		"user_id": 1,
		"managed_user_id": 3,
		"created_at": null,
		"updated_at": null
		},
		{
		"id": 3,
		"user_id": 1,
		"managed_user_id": 4,
		"created_at": "2018-01-27 12:34:26",
		"updated_at": "2018-01-27 12:34:26"
		},
		{
		"id": 4,
		"user_id": 1,
		"managed_user_id": 1,
		"created_at": "2018-01-27 12:34:26",
		"updated_at": "2018-01-27 12:34:26"
		}
	])
  }
}

module.exports = PartnerSeeder
