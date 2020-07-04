
$(function() {
    $('#disableAppStore').click(function() {
      $('#console-event').html('Toggle: ' +  $(this).hasClass('active') + tags[0])
      if($(this).hasClass('active') === true) { //Enable Restrictions
        console.log('Restriction is enabled');
        toggleRestriction('add', 'disableAppStore');
      }
      else {
        console.log('restriction is disabled');
        toggleRestriction('delete', 'disableAppStore');
      }
    })
  })

$(function() {
  $('#disableGoogleChrome').click(function() {
    $('#console-event').html('Toggle: ' +  $(this).hasClass('active') + tags[0])
    if($(this).hasClass('active') === true) { //Enable Restrictions
      console.log('Restriction is enabled');
      toggleRestriction('add', 'disableGoogleChrome');
    }
    else {
      console.log('restriction is disabled');
      toggleRestriction('delete', 'disableGoogleChrome');
    }
  })
})

$(function() {
  $('#disableSafari').click(function() {
    $('#console-event').html('Toggle: ' +  $(this).hasClass('active') + tags[0])
    if($(this).hasClass('active') === true) { //Enable Restrictions
      console.log('Restriction is enabled');
      toggleRestriction('add', 'disableSafari');
    }
    else {
      console.log('restriction is disabled');
      toggleRestriction('delete', 'disableSafari');
    }
  })
})

$(function() {
  $('#disableYoutube').click(function() {
    $('#console-event').html('Toggle: ' +  $(this).hasClass('active') + tags[0])
    if($(this).hasClass('active') === true) { //Enable Restrictions
      console.log('Restriction is enabled');
      toggleRestriction('add', 'disableYoutube');
    }
    else {
      console.log('restriction is disabled');
      toggleRestriction('delete', 'disableYoutube');
    }
  })
})

$(function() {
  $('#eraseAllContentAndSettings').click(function() {
    $('#console-event').html('Toggle: ' +  $(this).hasClass('active') + tags[0])
    if($(this).hasClass('active') === true) { //Enable Restrictions
      console.log('Restriction is enabled');
      toggleRestriction('add', 'eraseAllContentAndSettings');
    }
    else {
      console.log('restriction is disabled');
      toggleRestriction('delete', 'eraseAllContentAndSettings');
    }
  })
})


$(function() {
  $('#blockFacebook').click(function() {
    $('#console-event').html('Toggle: ' +  $(this).hasClass('active') + tags[0])
    if($(this).hasClass('active') === true) { //Enable Restrictions
      console.log('Restriction is enabled');
      toggleRestriction('add', 'blockFacebook');
    }
    else {
      console.log('restriction is disabled');
      toggleRestriction('delete', 'blockFacebook');
    }
  })
})
//Our tags array would come from the meraki api.  When the page loads, we would query the api to find out what tags the device currently has.
var tags = [ "disableAppStore",
       "disableGoogleChrome"
]
$('#console-event').html()
console.log(tags[0])

//Find out if this restriction is already set
// if (tags.includes('disableAppStore')) {
//   console.log('App store is disabled')
//   $('#disableAppStore').addClass('active')
// }

function toggleRestriction(action, tag) {
 $.post("./add.php",
    {
        updateTags: "True",
        device_id: "C6KT17CWHG6W",
        action: action,
        tags: tag
    },
    function(data, status){
        console.log(data);
    });

}


function listTags(serial_number) {
  $.get("./list.php?serial=" + serial_number, function(data, status) {
    var json = JSON.parse(data);
    console.log(json[0]);

      for (var i = json.length - 1; i >= 0; i--) {
      $('#' + json[i]).removeClass('active')
      console.log('tag: ' + json[i]);
      }

  })
}


listTags('C6KT17CWHG6W');
