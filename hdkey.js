const HDKey = require('hdkey')
const Wallet = require('./index.js')

function VaporyHDKey () {
}

/*
 * Horrible wrapping.
 */
function fromHDKey (hdkey) {
  var ret = new VaporyHDKey()
  ret._hdkey = hdkey
  return ret
}

VaporyHDKey.fromMasterSeed = function (seedBuffer) {
  return fromHDKey(HDKey.fromMasterSeed(seedBuffer))
}

VaporyHDKey.fromExtendedKey = function (base58key) {
  return fromHDKey(HDKey.fromExtendedKey(base58key))
}

VaporyHDKey.prototype.privateExtendedKey = function () {
  if (!this._hdkey.privateExtendedKey) {
    throw new Error('This is a public key only wallet')
  }
  return this._hdkey.privateExtendedKey
}

VaporyHDKey.prototype.publicExtendedKey = function () {
  return this._hdkey.publicExtendedKey
}

VaporyHDKey.prototype.derivePath = function (path) {
  return fromHDKey(this._hdkey.derive(path))
}

VaporyHDKey.prototype.deriveChild = function (index) {
  return fromHDKey(this._hdkey.deriveChild(index))
}

VaporyHDKey.prototype.getWallet = function () {
  if (this._hdkey._privateKey) {
    return Wallet.fromPrivateKey(this._hdkey._privateKey)
  } else {
    return Wallet.fromPublicKey(this._hdkey._publicKey, true)
  }
}

module.exports = VaporyHDKey
