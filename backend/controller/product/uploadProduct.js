const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")


const uploadToCloudinary = require("../../middleware/uploadToCloudinary")

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId
        console.log(sessionUserId,"Iam here")
        const { productName,brandName,category,price,sellingPrice,description } = req.body
        const productImage =  req.files['productImage']?.[0]

        console.log("Data",productImage)

        if (!uploadProductPermission(sessionUserId)) {
            console.log("error oc")
            throw new Error("Permission denied")
        }

        const myCloud = await uploadToCloudinary(productImage.buffer);
        const productData = {
            productName,
            brandName,
            category,
            productImage: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            description,
            price,
            sellingPrice
        }
        console.log(productData)
        const uploadProduct = new productModel(productData)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "Product upload successfully",
            error: false,
            success: true,
            data: saveProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = UploadProductController