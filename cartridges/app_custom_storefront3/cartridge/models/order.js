
'use strict';

var base=module.superModule;
// var TotalsModel = require('*/cartridge/models/totals');

function loyaltyCheck(customerNo) {

    var CustomerMgr = require('dw/customer/CustomerMgr');
    var profile=CustomerMgr.getProfile(customerNo);

    
}

function OrderModel(lineItemContainer, options) {
    base.call(this,lineItemContainer, options);
    // if (options.loyltyPoint) {
    //     var totalsModel = new TotalsModel(lineItemContainer);
    //     this.totals = totalsModel;
        
    // }
    if (lineItemContainer.customer.profile.jobTitle) {
        this.loyaltyPrice=lineItemContainer.customer.profile.jobTitle;
    }

    
    
}
module.exports = OrderModel;