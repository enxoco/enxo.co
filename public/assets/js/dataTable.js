$( document ).ready(function() {

  var tableEmptySpan = `<span class="tableEmptySpan">Sorry we don't have any activity to show yet for this week.</span>`

    $('.sidebar-collapse').on('click', function(){
      $('.page-body').toggleClass('collapsed');
    });
    $('.sidebar-open').on('click', function(){
      $('.page-sidebar').removeClass('toggled');

    });
    $('.sidebar-close').on('click', function(){
      $('.page-sidebar').addClass('toggled');
    });

    $('.nav-stacked').on('show.bs.collapse', function () {
        $('.nav-stacked .in').collapse('hide');
    });


  var userName = $('#hidden_user_name')
  var deviceId = $('#hidden_device_id')

  //Simple loading animation for our datatables views
  var loadingAnimation = '<center><svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" \
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" \
  style="width:25%; height:25%; margin:20px; "> \
  <circle fill="none" stroke="#203a45" stroke-width="4" cx="50" cy="50" r="44" style="opacity:1;"/> \
  <circle fill="#fff" stroke="#2faeed" stroke-width="3" cx="8" cy="54" r="6" > \
  <animateTransform \
    attributeName="transform" \
    dur="1s" \
    type="rotate" \
    from="0 50 48" \
    to="360 50 52" \
    repeatCount="indefinite" /> \
  </circle> \
  </svg> \
  <h2 style="text-align: center;">Loading</h2>'

  $.get(`/report/${deviceId.val()}/0`, function(data, status){
    emailTopHitsTable(data.topHits, userName.val())
    explicitSearches(data.searches, userName.val())
    potentialPorn(data.blocks, userName.val())


  });

  var thisUserIs = deviceId.val()
  var loggedInUserIs = $('#loggedInUsersId').val()

  $('#deviceTable').html(loadingAnimation)
  $.post("/device/list", {
    id: thisUserIs
  })
  .done(function (data) {

    if(!data) {
      $('.hasDevices').css('display','none')
      $('#status').html("<br /><br />You don\'t currently have any devices enrolled.  <br />Click the My Device Setup link to the left to begin setting up your devices")
      $('#deviceTable').empty('something here')
    } else {
      $('.hasDevices').css('display','inherit')

      $('#deviceTable').html('')
      $('#deviceHeading').html('Devices')
      for(var x = 0; x < data.devices.length; x++) {

        if(thisUserIs != loggedInUserIs) {
          var manageButton = `
          <form method="post" action="/restrictions">
            <input type="hidden" name="userId" value="${thisUserIs}" />
            <input type="hidden" name="id" value="${data.devices[x].id}">
              <button type="submit" class="btn btn-default" value="submit">
                Manage <br /> Restrictions
              </button>
              `
        } else {
          var manageButton = ``
        }


        if(data.devices[x].device_type) {
          data.devices[x].name = data.devices[x].device_type
          data.devices[x].serialNumber = data.devices[x].serial_number
        }
        if(data.devices[x].isSupervised === true) {
          $('#deviceTable').append(`<tr>
            <td>${data.devices[x].name}</td>
            <td>${data.devices[x].serialNumber}</td>
            <td>${manageButton}</td>
              <td><span class="badge badge-success">Supervised</span></td>

            </tr>`
          )
        } else {

            $('#deviceTable').append(`<tr>
              <td>${data.devices[x].name}</td>
              <td>${data.devices[x].serialNumber}</td>
              <td>${manageButton}</td>
                <td><span class="badge badge-success">VPN user</span></td>

              </tr>`
            )


        }


      }
      $('#status').html(' ')

    }
  })

//Custom date select function
$('#names').each(function(){

    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled" id="select-names"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {

    // document.getElementById("expand-column").style.height = "375px";
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){

            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {




        e.stopPropagation();
        $('.page-sidebar').addClass('toggled')
        // document.getElementById("expand-column").style.height = "125px";
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();

        var name = $('.select-styled.dates').text()
        var thisUserIs = $this.val($(this).attr('rel')).val()
        var loggedInUserIs = $('#loggedInUsersId').val()

        var newDate = ""

            switch($('.select-styled.dates').text()) {
              case 'This Week':
                newDate = 0;
                break;
              case 'Last Week':
                newDate = 1;
                break;
              case '2 Weeks ago':
                newDate = 2;
                break;
              case '3 Weeks ago':
                newDate = 3;
                break;
              case 'Last Month':
                newDate = 4;
                break;
            }

        var start = moment().subtract(newDate, 'weeks').startOf('isoWeek');
        var end = moment().subtract(newDate, 'weeks').endOf('isoWeek');
        $('#name').html($('#select-names').text())
        if($this.val() != $('#hidden_device_id').val()) {
          $('#invitationCard').hide()
        }
        // $('#hidden_device_id').val($this.val())

        //Show loading animation while waiting for devices to update


        $('#deviceTable').html(loadingAnimation)
        $.post("/device/list", {
          id: $this.val()
        })
        .done(function (data) {
          if(!data) {
            $('.hasDevices').css('display','none')
            $('#status').html("<br /><br />You don\'t currently have any devices enrolled.  <br />Click the My Device Setup link to the left to begin setting up your devices")
            $('#deviceTable').empty('something here')
          } else {
            $('.hasDevices').css('display','inherit')

            $('#devicesSelect').append(data.devices[0].name)
            $('#deviceTable').html('')

            for(var x = 0; x < data.devices.length; x++) {

              if(thisUserIs != loggedInUserIs) {
                var manageButton = `
                <form method="post" action="/restrictions">
                  <input type="hidden" name="userId" value="${$this.val()}" />
                  <input type="hidden" name="id" value="${data.devices[x].id}">
                    <button type="submit" class="btn btn-default" value="submit">
                      Manage <br /> Restrictions
                    </button>
                    `
              } else {
                var manageButton = ``
              }

              if(data.devices[x].device_type) {
                data.devices[x].name = data.devices[x].device_type
                data.devices[x].serialNumber = data.devices[x].serial_number
              }
              if(data.devices[x].isSupervised === true) {
                $('#deviceTable').append(`<tr>
                  <td>${data.devices[x].name}</td>
                  <td>${data.devices[x].serialNumber}</td>
                  <td>${manageButton}</td>
                    <td><span class="badge badge-success">Supervised</span></td>

                  </tr>`
                )
              } else {

                  $('#deviceTable').append(`<tr>
                    <td>${data.devices[x].name}</td>
                    <td>${data.devices[x].serialNumber}</td>
                    <td>${manageButton}</td>
                      <td><span class="badge badge-success">VPN user</span></td>

                    </tr>`
                  )


              }


            }
            $('#status').html(' ')

          }
        })



        $('#curName').html($('#select-names').text().split(' ')[0])
        $('#partners').hide()
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        //date, user id, name

        $.get(`/report/${$this.val()}/${newDate}`)

        .done(function( data ) {
          if(data.topHits.length == 0) {
            $('#emailTopHitsTable').html(tableEmptySpan)
            $('#explicitSearchesTable').html(tableEmptySpan)
            $('#potentialPorn').html(tableEmptySpan)
            $('#pie-chart').html(tableEmptySpan)

            $('.tableEmptySpan').css('display', 'inline')


          } else {
            $('.tableEmptySpan').css('display', 'none')
            emailTopHitsTable(data.topHits, $('#select-names').text())
            explicitSearches(data.searches, $('#select-names').text())
            potentialPorn(data.blocks, $('#select-names').text())
          }
        });

    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
        // document.getElementById("expand-column").style.height = "125px";

    });

});


$('#dates').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled dates"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {

    // document.getElementById("expand-column").style.height = "375px";
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){

            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {

        e.stopPropagation();
        $('.page-sidebar').addClass('toggled')
        // document.getElementById("expand-column").style.height = "125px";
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));

        $list.hide();

        var date = ""


            switch($('.select-styled.dates').text()) {
              case 'This Week':
                date = 0;
                break;
              case 'Last Week':
                date = 1;
                break;
              case '2 Weeks ago':
                date = 2;
                break;
              case '3 Weeks ago':
                date = 3;
                break;
              case 'Last Month':
                date = 4;
                break;
            }


        var start = moment().subtract($this.val(), 'weeks').startOf('isoWeek');
        var end = moment().subtract($this.val(), 'weeks').endOf('isoWeek');

        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        $.ajax({
           url: `/report/${$('select#names').val()}/${date}`,
           data: {
              format: 'json'
           },
           error: function() {
              $('#info').html('<p>An error has occurred</p>');
           },
           dataType: 'jsonp',
           success: function(data) {
              var $title = $('<h1>').text(data.talks[0].talk_title);
              var $description = $('<p>').text(data.talks[0].talk_description);
              $('#info')
                 .append($title)
                 .append($description);
           },
           type: 'GET'
        });


        $.get(`/report/${$('select#names').val()}/${date}`)
            .done(function (data) {

              if(data.topHits.length == 0) {

                $('#emailTopHitsTable').html(tableEmptySpan)
                $('#explicitSearchesTable').html(tableEmptySpan)
                $('#potentialPorn').html(tableEmptySpan)
                $('#pie-chart').html(tableEmptySpan)


                $('.tableEmptySpan').css('display', 'inline')
                var json = []


              } else {
                $('.tableEmptySpan').css('display', 'none')
                emailTopHitsTable(data.topHits, $('#select-names').text())
                explicitSearches(data.searches, $('#select-names').text())
                potentialPorn(data.blocks, $('#select-names').text())
                var json = data

              }
            })


    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
        // document.getElementById("expand-column").style.height = "125px";

    });

});

$('#deviceId').val($('#devicesSelect').val())
$('#devicesSelect').each(function(){

    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled dates"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {

    // document.getElementById("expand-column").style.height = "375px";
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){

            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {



        e.stopPropagation();
        $('.page-sidebar').addClass('toggled')
        // document.getElementById("expand-column").style.height = "125px";
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));

        $list.hide();
        $('#deviceId').val($this.val())
        $('.page-content').html(loadingAnimation)
        var form = `<form method="post" action="/restrictions">
        <input type="hidden" name="userId" value="${$('select#names').val()}" />
        <input type="hidden" name="id" value="${$this.val()}">
          <button style="display:none" id="deviceSelectForm" type="submit" class="btn btn-default" value="submit">
            Manage Restrictions
          </button>`
        $('#deviceSelectFormHolder').html(form)
        $('#deviceSelectForm').click()


    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
        // document.getElementById("expand-column").style.height = "125px";

    });

});

    function getHostName(url) {
        var match = url.replace(/^(?:https?:\/\/)?(?:www[0-9]?\.)?/i, "");
        if(match.includes('amazon.com/gp')) {
          return 'Amazon'
        }
        if(match.includes('ampproject.net')){
          return 'Content Delivery Network'
        }
        // var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
          if(match[2].includes('porn') || match[2].includes('sex') || match[2].includes('xxx')) {
            return match[2].substring(0,10) + ' PORN!'
          }
        return match.substring(0, 40);
        }
        else {
            return url;
        }
    }


    function explicitSearches(data, userName) {


    if ( $.fn.DataTable.isDataTable( '#explicitSearchesTable' ) ) {
      $('#explicitSearchesTable').DataTable().destroy();
    }
    var hosts = []
    var table = $('#explicitSearchesTable').DataTable( {
      searching: false,
      pagingType: "full",
      lengthChange: false,
      responsive: true,
      data: data,

      order:[1, 'desc'],
      columns: [
              {
                title: "Date",
                data: "date"
              },
              {
                title: "Search Term",
                data: "searchTerm"
              },
          ],
          language: {
            emptyTable: "<center>There were no flagged searches for this week",
            processing: loadingAnimation,
            info: "_PAGE_ of _PAGES_ pages"
          }

      } );

  }


    function emailTopHitsTable(json, userName) {


    if ( $.fn.DataTable.isDataTable( '#emailTopHitsTable' ) ) {
      $('#emailTopHitsTable').DataTable().destroy();
    }


    $('#pie-chart').html(loadingAnimation)

      var label = []
      var count = []
        for (var i = 0; i< json.length; i++) {
          var url = json[i].URL
          url = url.replace(/http:\/\/|https:\/\/|www.|"/g, '')
          label.push(url.substring(0,25))
          count.push(json[i].count)
        }
               // Pie chart
               var labels = label;
               var datas = count;
               var colors = ['#2faeec', '#18638f', '#33567f', '#3a6090', '#416b9f', '#4773ab', '#4c7db7', '#668cc3', '#8aa2cc', '#a3b5d5'];
               var selector = '#pie-chart';
       
               var data = []
               // Create Chart
              for (var i = 0; i < 11; i++) {
                data.push({label: labels[i], data: datas[i]})
              }

             var options = {
                 series: {
                     pie: {
                         show: true,
                         radius: 1,
                         label: {
                             show: true,
                             radius: 0.8,
                             threshold: 0.1
                         }
                     }
                 },
                 grid: {
                     hoverable: true
                 },
                 tooltip: true,
                 colors: colors,
                 tooltipOpts: {
                     cssClass: "flotTip",
                     content: "%s",
                     shifts: {
                         x: 20,
                         y: 0
                     },
                     defaultTheme: false
                 }
             };
             if(json.length != 0) {
               $.plot($("#pie-chart"), data, options);
       
             }
             else {
               $("#pie-chart").html('<span class="tableEmptySpan">Sorry we don\'t have any activity to show yet for this week.</span>')
             }

    var hosts = []

      var table = $('#emailTopHitsTable').DataTable( {
        searching: false,
        pagingType: "full",
        lengthChange: false,
        responsive: true,
        sortable: false,
        data: json,
  
        columns: [
                {
                  title: "Site",
                  data: "URL",
                  render: function ( data, type, row ) {
                    return getHostName(data).substring(0, 60)
                  }
                },
            ],
            language: {
              emptyTable: '<center>Sorry there is no activity for " + userName + " so far this week</center>',
              processing: loadingAnimation,
              info: "_PAGE_ of _PAGES_ pages"
            }
  
        } );


  }






    function potentialPorn(json, userName) {



    if ( $.fn.DataTable.isDataTable( '#potentialPorn' ) ) {
      $('#potentialPorn').DataTable().destroy();
    }

    var hosts = []
    var table = $('#potentialPorn').DataTable( {
      searching: false,
      pagingType: "full",
      lengthChange: false,
      responsive: true,
      data: json,

      order:[1, 'desc'],
      columns: [
              {
                title: "Date",
                data: "date",
                sortable: false
              },
              {
                title: "Title or Search term",
                data:"URL",
                render: function( data, type, row) {
                  if (data.includes('q=')) {
                    var search = data.split('q=')[1].split('&')[0]
                    return search.replace(/%/g, ' ')
                  } else {
                    return data
                  }
                }


              }

          ],
          language: {
            emptyTable: "<center>There are no blocked sites so far this week",
            processing: loadingAnimation,
            info: "_PAGE_ of _PAGES_ pages"
          }

      } );





  }

});
