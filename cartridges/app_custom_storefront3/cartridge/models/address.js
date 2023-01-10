'use strict';
var base=module.superModule;

/**
 * Address class that represents an orderAddress
 * @param {dw.order.OrderAddress} addressObject - User's address
 * @constructor
 */
function address(addressObject) {
    base.call(this,addressObject)
    if (!!addressObject) {
        this.address.secondPhone=addressObject.secondName;
    }
    
    
}

module.exports = address;
