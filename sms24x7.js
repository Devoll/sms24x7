var http = require('http');

function sms24x7(email, password, debug){
    this.debug = debug || false;
    this.email = email;
    this.password = password;
    this.endpoint = 'http://api.sms24x7.ru/'
}

sms24x7.prototype = {
    send: function(number, text, callback){
        var _this = this;
        this.login(this.email, this.password, function(err, sid){
            if(err){
                throw new Error(err);
            }

            var url_send = _this.endpoint
                + '?method=push_msg'
                + '&phone=' + number
                + '&text=' + text
                + '&sid=' + sid
                + '&format=json';

            if(_this.debug){ console.log('[Request] ' + url_send); }

            http.get(url_send,

                function(res){
                    res.on('data', function(data){
                        if(_this.debug){ console.log('[Response] ' + data); }

                        var res = JSON.parse(data);

                        if(res.response.id){
                            callback(null, res.response.id);
                        }else{
                            callback(res.err_code);
                        }
                    });
                }
            );

        });
    },

    login: function(email, password, callback){
        var _this = this;

        var url_login = _this.endpoint
            + '?method=login'
            + '&email=' + email
            + '&password=' + password
            + '&format=json';

        if(_this.debug){ console.log('[Request] ' + url_login); }

        http.get(url_login,

            function(res){
                res.on('data', function(data){
                    if(_this.debug){ console.log('[Response] ' + data); }
                    var res = JSON.parse(data);

                    if(res.response.data.sid){
                        callback(null, res.response.data.sid);
                    }else{
                        callback('error auth');
                    }
                });
            }
        );
    }
};

module.exports = sms24x7;