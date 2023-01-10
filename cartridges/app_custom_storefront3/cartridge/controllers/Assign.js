'use strict';
var server = require('server');
server.get('Assignment', function(req,res,next){
    
    res.render('Training/contentasset',{test:'currentBasket'});

    next();
});

module.exports=server.exports();