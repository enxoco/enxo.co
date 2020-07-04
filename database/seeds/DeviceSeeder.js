'use strict'
const Database = use('Database')

/*
|--------------------------------------------------------------------------
| DeviceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class DeviceSeeder {
  async run () {

 await Database.table('devices').insert([
    	{
    		created_at: '2018-01-18 17:26:38',
    		updated_at: '2018-01-18 17:26:38',
    		id: '657525545596209962',
    		serial_number: 'F71SLLXFHG7P',
            user_id: 1,
            password: '5zWYkAX5qa3RMQP4v9',
            device_type: 'iPhone'
    	},
    	{
    		created_at: '2018-01-18 17:30:53',
    		updated_at: '2018-01-18 17:30:53',
    		id: '657525545596210567',
    		serial_number: 'C39VH4JTJCL7',
            password: 'x376oj8Ap9ROBaJ4AX',
            device_type: 'iPhone'

    	},
    	{
    		created_at: '2018-01-18 17:32:35',
    		updated_at: '2018-01-18 17:32:35',
    		id: '657525545596210180',
    		serial_number: 'C39S2A2FGRWF',
            password: 'z9W5yMrA36jzd32WQn',
            device_type: 'iPhone'

    	},
    	{
    		created_at: '2018-01-18 19:04:26',
    		updated_at: '2018-01-18 19:04:26',
    		id: '657525545596211651',
    		serial_number: 'F17VV575JCLQ',
            password: '2qNpnMP6ZXJkK2n7e3',
            device_type: 'iPhone'

    	},
    	{
    		created_at: '2018-01-19 07:34:01',
    		updated_at: '2018-01-19 07:34:01',
    		id: '628252148018393404',
    		serial_number: 'F71VXE38HG7K',
            password: '657525545596211651',
            device_type: 'iPhone'

    	},
    	{
    		created_at: '2018-01-19 07:35:59',
    		updated_at: '2018-01-19 07:35:59',
    		id: '628252148018389359',
    		serial_number: 'DNPM77XXFFFM',
            password:'z9W5Z3E3QeDw2Rb7Qn',
            device_type: 'iPhone'

    	},
    	{
    		created_at: '2018-01-19 07:47:30',
    		updated_at: '2018-01-19 07:47:39',
    		id: '657525545596211418',
    		serial_number: 'C6KSG7A8HG7M',
            password: '2qNpnMP6ZXJkKPP7e3',
            device_type: 'iPhone'
    	},
        {
            created_at: '2018-01-19 07:47:30',
            updated_at: '2018-01-19 07:47:39',
            id: 'unknown1',
            serial_number: 'unknown1',
            device_type: 'Macbook'
        },
        {
            created_at: '2018-01-19 07:47:30',
            updated_at: '2018-01-19 07:47:39',
            id: '657525545596210184',
            serial_number: 'W80232A1AGU',
            device_type: 'Macbook'
        },
        {
            created_at: '2018-01-19 07:47:30',
            updated_at: '2018-01-19 07:47:39',
            id: '628252148018393714',
            serial_number: 'C39VQCNWJCLF',
            password: '937BZDoDPlmne1k7el',
            device_type: 'iPhone'
        }
    ])

  }
}

module.exports = DeviceSeeder
