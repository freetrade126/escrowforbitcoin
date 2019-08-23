const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WalletSchema = new Schema({
    address: {type: String, required: true, max: 100},
    privkey: {type: String, required: true, max: 200},
    uid: {type: Numberm},
    balance: {type: Numberm},
    last_checked: {type: Numberm}
});


// Export the model
module.exports = mongoose.model('Wallet', WalletSchema);
