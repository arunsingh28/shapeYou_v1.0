const mongoose = require('mongoose');
const emp = new mongoose.Schema({
    date_of_creation : {
        type : String,
        required : true
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    s_status : {
        type : String,
        required : true
    },
    t_client : {
        type : Number,
        required : true,
        default : 0
    },
    t_diet : {
        type : Number,
        required : true,
        default : 0
    },
    leaves : {
        type : Number,
        required : true,
        default : 0
    },
    education : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('emp',emp);