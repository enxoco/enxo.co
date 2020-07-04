'use strict'

class FourOhFourController {

	async show ({request, response, view}) {
		view.render('404page')
	}
}

module.exports = FourOhFourController
