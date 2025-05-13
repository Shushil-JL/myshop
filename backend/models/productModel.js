const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : {public_id : String, url : String},
    description : String,
    price : Number,
    sellingPrice : Number
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel