require('dotenv').config()
const crypto = require('crypto')
const CryptoJS = require('crypto-js')
const algorithm = process.env.ALGORITHM
const key = Buffer.from(process.env.KEY)
const iv = Buffer.from(process.env.IV)

exports.encrypt = (text) => {
  try {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
  } catch (error) {
    return error
  }
}

exports.decrypt = (text) => {
  try {
    const encryptedText = Buffer.from(text, 'hex')
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  } catch (error) {
    return error
  }
}

exports.Encrypt = (value) => {
  try {
    if (value) {
      return CryptoJS.AES.encrypt(JSON.stringify(value), process.env.ENCRIPTION_KEY).toString()
    }
  } catch (error) {
    return error
  }
}

exports.Decrypt = (value) => {
  try {
    if (value) {
      return CryptoJS.AES.decrypt(value, process.env.ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)
    }
  } catch (error) {
    return error
  }
}
