$(window).resize(function(){
    /*
    width=$(window).width()
    height=$(window).height()
    console.log(width)
    console.log(height)
    ratio = 745/1326
    $('#background').css('background',width+100+'px '+height*ratio+'px')
    */
});

var shortUrl;
function getShortUrl(longUrl, login, apiKey){
    $.ajax({
        url: "http://api.bitly.com/v3/shorten?format=json",
        async: false,
        dataType: 'json',
        data: {"apikey": apiKey,"login": login,"longUrl": longUrl},
        success: function (json) {
            mydata = json.data.url;
        }
    });
return mydata;
}

Parse.initialize("eBWdI7PNUqyKjVScceC1KfKIRw3N1ScfOM45JOBE", 
                "6bQSQ8KlG8aJ8qJXOwrMbP6eRt7xeZZyW2moKfuP");

var Member = Parse.Object.extend("Members");

function login(){
     FB.login(function(response) {
       if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         url = getShortUrl('http://www.getplunder.com/','o_3n1puoqkjk',
                            'R_0877992b078175ddd6477ef109a01edd');
         console.log(url)
         mobileURL = $('#mobile').val()+''
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
                mobile:mobileURL,
                facebookToken: FB.getAuthResponse()['accessToken'],
            },{
            success: function(object) {
                console.log("success")
                 $('#input').hide()
                 $('#share').show()
            },
            error: function(model, error) {
                console.log("error")
            }
         });

         });
         // All the Javascript you want to execute goes here
         // Use an ajax request to required data to the server
       } else {
         console.log('User cancelled login or did not fully authorize.');
       }
     });
    }
    
function userSave(){
    var member = new Member();
    url = getShortUrl('http://www.getplunder.com/','o_3n1puoqkjk',
                        'R_0877992b078175ddd6477ef109a01edd');
    console.log(url)
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
        error: function(model,error) { console.log("error") }
    });
}

function userURL(id){
    var query = new Parse.Query('Members')
    query.equalTo("facebookToken", id);
    query.find({
        success: function(results){
            console.log('asd')
            console.log(results)
            referURL = results[0].attributes.referURL
            $('#share').append('<p>'+referURL+'</p>')
        },
        error: function(results){
            console.log("query error")
        }
    });
}
$(window).resize(function() {
    resizeImage()
    $('.flexslider').flexslider();
});

$(document).ready(function() {
    resizeImage()
});

function resizeImage(){
    width = $(window).width()
    height = $(window).height()
    ratio = 1599/350
    
    $('#main-content').height(height-115-100)
    console.log(height)
}
