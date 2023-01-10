'use strict';

var base=module.superModule;
var URLUtils = require('dw/web/URLUtils');
var ProductMgr = require('dw/catalog/ProductMgr');
var TotalsModel = require('*/cartridge/models/totals');
var CustomObjectMgr = require('dw/object/CustomObjectMgr')
function getCustomerPaymentInstruments(userPaymentInstruments) {
    var paymentInstruments;

    paymentInstruments = userPaymentInstruments.map(function (paymentInstrument) {
        var result = {
            creditCardHolder: paymentInstrument.creditCardHolder,
            maskedCreditCardNumber: paymentInstrument.maskedCreditCardNumber,
            creditCardType: paymentInstrument.creditCardType,
            creditCardExpirationMonth: paymentInstrument.creditCardExpirationMonth,
            creditCardExpirationYear: paymentInstrument.creditCardExpirationYear,
            UUID: paymentInstrument.UUID
        };

        result.cardTypeImage = {
            src: URLUtils.staticURL('/images/' +
                paymentInstrument.creditCardType.toLowerCase().replace(/\s/g, '') +
                '-dark.svg'),
            alt: paymentInstrument.creditCardType
        };

        return result;
    });

    return paymentInstruments;
}

 function latestFav(customerno) {
    var ImageModel = require('*/cartridge/models/product/productImages');
    if (customerno) {
        var customerNo = parseInt(customerno);
        var existCustomer=CustomObjectMgr.getCustomObject('favProduct',customerNo);
        
        if (existCustomer)
         {
            var productId=existCustomer.custom.favPid;
            var peoductDetails=productId.split(" ");
        var lastProduct=peoductDetails[peoductDetails.length-1];
        var productDetails=ProductMgr.getProduct(lastProduct);
        var ImageModel= new ImageModel(productDetails, { types: ['medium'], quantity: 'single' });
    //    var price=new TotalsModel(productDetails.priceModel);

        ImageModel= ImageModel.medium[0];
        return favProduct={
            productDetails:productDetails,
            ImageModel:ImageModel
        };
    }
    else{
        return favProduct=false;
    }
   
    }
};

function account(currentCustomer, addressModel, orderModel) {

    base.call(this,currentCustomer,addressModel,orderModel)
    if (!!currentCustomer.raw.authenticated) {
        this.favourite= latestFav(currentCustomer.profile.customerNo);

    }
    
}
account.getCustomerPaymentInstruments = getCustomerPaymentInstruments;
module.exports = account;
