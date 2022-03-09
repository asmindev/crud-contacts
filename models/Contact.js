const mongoose = require('mongoose');

const Contact = mongoose.model('Contact',{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = Contact
