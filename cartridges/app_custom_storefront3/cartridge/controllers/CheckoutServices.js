'use strict';
var server = require('server');
server.extend(module.superModule);

server.append('PlaceOrder', function(req,res,next){
    var Transaction = require('dw/system/Transaction');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var OrderMgr = require('dw/order/OrderMgr');
var viewData=res.getViewData();
var latestOrder= OrderMgr.getOrder(viewData.orderID,viewData.orderToken);
var currentCustomerProfile=CustomerMgr.getProfile(latestOrder.customerNo);
var totalPercentage=(latestOrder.adjustedMerchandizeTotalGrossPrice.value)/100*10;
Transaction.wrap(function(){
    if(currentCustomerProfile.jobTitle){
        currentCustomerProfile.jobTitle=parseInt(currentCustomerProfile.jobTitle)+totalPercentage;

    }else{
        currentCustomerProfile.jobTitle=totalPercentage
    }
})
next();
})
module.exports = server.exports();
