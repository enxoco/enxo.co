const { hooks } = require('@adonisjs/ignitor')

const moment = require('moment');


hooks.after.providersRegistered(() => {
  var stamp = JSON.stringify(moment().unix())
  const View = use('View')
  View.global('time', function() {
    return stamp
  })

View.global('disableLink', function(url){
      if(url.length > 60) {
     var url = url.substring(0, 60) + '...'
  }
  return this.safe(`<a href="" style="text-decoration:none;color: black; -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;">${url}</a>`)

})






  // execute your code
})
