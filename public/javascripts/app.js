/*
  window.fbAsyncInit = function() {
        FB.init({
          appId      : "<%= @app['id'] %>",                     // App ID
          channelUrl : "<%= url_no_scheme('/channel.html') %>", // Channel File
          status     : true,                                    // check login status
          cookie     : true,                                    // enable cookies
          xfbml      : true                                     // parse XFBML
        });

        FB.Event.subscribe('auth.login', function(response) {
          window.location = window.location;
        });

        FB.Canvas.setAutoGrow();

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                console.log('logged in')
                $('#infoForm').hide()
                $('#share').show()
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
                console.log('not authorized')
            } else {
                // the user isn't logged in to Facebook.
                console.log('not logged in')
            }
        });
      };
*/

   Parse.initialize("eBWdI7PNUqyKjVScceC1KfKIRw3N1ScfOM45JOBE", "6bQSQ8KlG8aJ8qJXOwrMbP6eRt7xeZZyW2moKfuP");

    var Member = Parse.Object.extend("Members");

  function the_login(){
     FB.login(function(response) {
       if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(r) {
            var member = new Member();
            member.save({
                firstName: r.first_name,
                lastName: r.last_name,
                gender: r.gender,
                email: r.email,
                password: 'lol',
                country:r.locale,
                facebookToken: FB.getAuthResponse()['accessToken'],
            },{
            success: function(object) {
                console.log("success")
            },
            error: function(model, error) {
                console.log("error")
            }
         });

         });
         // All the Javascript you want to execute goes here
         $('#content').hide()
         $('#thankYou').show()
         // Use an ajax request to required data to the server
       } else {
         console.log('User cancelled login or did not fully authorize.');
       }
     });
    }
    
    function userSave(){
        var member = new Member();
        member.save({
                firstName: $('#firstName').val(),
                lastName:  $('#lastName').val(),
                gender:  $('#gender').val(),
                password:  $('#password').val(),
                country:  $('#country').val(),
                email:  $('#email').val(),
                facebookToken: '',
            },{
            success: function(object){
                console.log("success")
            },
            error: function(model,error) {
                console.log("error")
            }
        });
    }
/*
      // Load the SDK Asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
*/
