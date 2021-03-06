"use strict";

const Method = require('../method');
const Property = require('../property');
const formatters = require('../formatters');

function Wallet(ygg) {
    this._requestManager = ygg._requestManager;

    let self = this;

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(function(p) {
        p.attachToObject(self);
        p.setRequestManager(self._requestManager);
    });
}

var methods = function () {
    let newAccount = new Method({
        name: 'newAccount',
        call: 'wallet_newAccount',
        params: 1,
        inputFormatter: [null]
    });

    let sign = new Method({
        name: 'sign',
		call: 'wallet_sign',
		params: 3,
		inputFormatter: [null, formatters.inputAddressFormatter, null]
    });

    let unlockAccount = new Method({
        name: 'unlockAccount',
        call: 'wallet_unlockAccount',
        params: 3,
        inputFormatter: [formatters.inputAddressFormatter, null, null]
    });

    let sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'wallet_sendTransaction',
        params: 2,
        inputFormatter: [formatters.inputTransactionFormatter, null]
    });

    let lockAccount = new Method({
        name: 'lockAccount',
        call: 'wallet_lockAccount',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter]
    });

    return [
        newAccount,
        unlockAccount,
        sign,
        sendTransaction,
        lockAccount
    ];
};

var properties = function () {
    return [
        new Property({
            name: 'listAccounts',
            getter: 'personal_listAccounts'
        })
    ];
};


module.exports = Wallet;
