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

