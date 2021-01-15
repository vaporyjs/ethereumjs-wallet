'use strict'

const inherits = require('util').inherits
const HookedWalletVapTxSubprovider = require('web3-provider-engine/subproviders/hooked-wallet-vaptx')

module.exports = WalletSubprovider

inherits(WalletSubprovider, HookedWalletVapTxSubprovider)

function WalletSubprovider (wallet, opts) {
  opts.getAccounts = function (cb) {
    cb(null, [ wallet.getAddressString() ])
  }

  opts.getPrivateKey = function (address, cb) {
    if (address !== wallet.getAddressString()) {
      cb(new Error('Account not found'))
    } else {
      cb(null, wallet.getPrivateKey())
    }
  }

  WalletSubprovider.super_.call(this, opts)
}
