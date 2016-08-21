import { HTTP } from 'meteor/http';

Meteor.methods({
    GetUrlData:function(data){
        this.unblock();
        var result = HTTP.call("GET", data.url,{});
        return result;
    },
});