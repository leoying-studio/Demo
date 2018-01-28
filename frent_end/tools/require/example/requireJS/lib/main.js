requirejs.config({
    baseUr:"./../lib",
    paths:{
        jquery:"./jquery-1.9.1.min",
        'signalR':'./jquery.signalR-2.1.1.min',
        'kendo-all':'./kendo.all'
    },
    shim:{
        'kendo-all':{
            'deps':['jquery','css!./css/kendo.common.min.css','css!./css/kendo.rtl.min.css','css!./css/kendo.default.min.css']
        },
        'signalR':{
            'deps':['jquery']
        }
    }
});

require(['kendo-all'],function(kendo){
     console.log(kendo);
});

