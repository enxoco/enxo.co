const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { response }) {

    return response.send(error)
    if (error.name === 'EBADCSRFTOKEN') {
      response.forbidden('Cannot process your request.')
    }
  }
}

module.exports = ExceptionHandler
