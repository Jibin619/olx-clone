'use strict';

var server=require('server');
server.extend(module.superModule);
var Transaction = require('dw/system/Transaction');
var OrderModel = require('*/cartridge/models/order');
var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');

var BasketMgr = require('dw/order/BasketMgr');
var Locale = require('dw/util/Locale');
var Money = require('dw/value/Money');
var formatMoney = require('dw/util/StringUtils').formatMoney;

var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var OrderModel = require('*/cartridge/models/order');


server.append('Begin', function(req,res,next){

    if (req.querystring.point) {
        var currentCustomer = req.currentCustomer.raw;
        var loyltyPoint=parseInt(req.querystring.point) ;
        var viewData=res.getViewData();
        var currentBasket = BasketMgr.getCurrentBasket(); 

        Transaction.wrap(function(){
            currentBasket.customer.profile.phoneMobile=true;

        })

        var usingMultiShipping = req.session.privacyCache.get('usingMultiShipping');
        var  allValid    = COHelpers.ensureValidShipments(currentBasket);
        var currentLocale = Locale.getLocale(req.locale.id);
        Transaction.wrap(function(){
            basketCalculationHelpers.calculateTotals(currentBasket);

        })

    

        var orderModel = new OrderModel(
            currentBasket,
            {
                customer: currentCustomer,
                usingMultiShipping: usingMultiShipping,
                shippable: allValid,
                countryCode: currentLocale.country,
                containerView: 'basket',
                loyltyPoint:loyltyPoint
            }
        );

        viewData.order=orderModel;
        res.setViewData(viewData);


    }

    next();
});


module.exports = server.exports();
