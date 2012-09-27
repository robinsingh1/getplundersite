$(window).resize(function(){
    console.log($(window).width())
    console.log($(window).height())
});

function getShortUrl(longUrl, login, apiKey, func)
{
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": api_key,
            "login": login,
            "longUrl": long_url
        },
        function(response)
        {
            func(response.data.url);
        }
    );
}

Parse.initialize("eBWdI7PNUqyKjVScceC1KfKIRw3N1ScfOM45JOBE", 
                "6bQSQ8KlG8aJ8qJXOwrMbP6eRt7xeZZyW2moKfuP");

var Member = Parse.Object.extend("Members");

function the_login(){
     FB.login(function(response) {
       if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         url = getShortUrl('www.getplunder.com','o_3n1puoqkjk',
                            'R_0877992b078175ddd6477ef109a01edd');
         FB.api('/me', function(r) {
            var member = new Member();
            member.save({
                firstName: r.first_name,
                lastName: r.last_name,
                gender: r.gender,
                email: r.email,
                password: 'lol',
                country:r.locale,
                referURL:url,
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
    url = getShortUrl('www.getplunder.com','o_3n1puoqkjk',
                        'R_0877992b078175ddd6477ef109a01edd');
    member.save({
            firstName: $('#firstName').val(),
            lastName:  $('#lastName').val(),
            gender:  $('#gender').val(),
            password:  $('#password').val(),
            country:  $('#country').val(),
            email:  $('#email').val(),
            referURL: url,
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

function userURL(){
    var query = new Parse.Query('Members')
    query.equalTo("lastName", "Singh");
    query.find({
        success: function(results){
            console.log("query success")
        },
        error: function(results){
            console.log("query error")
        }
}
