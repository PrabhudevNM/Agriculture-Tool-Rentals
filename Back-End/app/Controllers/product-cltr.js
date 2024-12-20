import Product from "../Models/product-model.js";
const productCltr={}
import getDataUri from "../../utils/dataUri.js"
import { v2 as cloudinary } from "cloudinary";

//listing all products
productCltr.list=async(req,res)=>{
    try {
        const product=await Product.find()
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
    }
}

//For all products of a particular user
productCltr.MyProductList = async (req, res) => {
    try {
        const products = await Product.find({ owner: req.userId });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching products" });
    }
};


// productCltr.get=async (req, res) => {
//     const id = req.params.id;
  
//     try {
//       const products = await Product.find(id);
//       console.log(products);
//       res.status(200).json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching products', error });
//     }
//   };

productCltr.create=async(req,res)=>{
    const body=req.body
    const file=req.file
    const fileUri = getDataUri(file); // or  getDataUri(file)
            const result = await cloudinary.uploader.upload(fileUri.content, {
                folder: "Profile",
            });
            body.file = result.secure_url;
    try{
        console.log("body",body)
        let temp = JSON.parse(body.rentalPriceForTime)  //we must parse the body in postman form-data
        // console.log(temp);
        body.rentalPriceForTime = [...temp]  // if pass objects it wont create id
        const products=new Product(body)
        products.user=req.userId
        products.owner=req.userId
        await products.save()
        console.log(products)
        res.status(201).json(products)
    }catch(error){
        res.json(error)
    }
}

// for showing only a product with passing id 
productCltr.show=async(req,res)=>{
    const id=req.params.id
    try {
        const  product=await Product.findOne({_id:id}).populate('owner')
        if(!product){
            return res.status(404).json({})
        }
        res.json(product)
    } catch (error) {
        res.json(error)
    }
}

// // for showing only a product with passing id 
// productCltr.show = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const product = await Product.findOne({ _id: id }).populate('owner', 'username phone email'); // Populate owner with specific fields

//         if (!product) {
//             return res.status(404).json({ message: "Product not found or unauthorized" });
//         }
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



productCltr.updateByUser = async (req, res) => {
    try {
        const userId = req.userId; // Extract user ID from the request
        const productId = req.params.id; // Extract product ID from the request params
        const body = { ...req.body }; // Clone the request body
        const file = req.file;

        // Handle rentalPriceForTime
        if (body.rentalPriceForTime) {
            try {
                body.rentalPriceForTime = JSON.parse(body.rentalPriceForTime);
            } catch (error) {
                return res.status(400).json({ message: "Invalid rentalPriceForTime format" });
            }
        }

        // Handle file upload if a new file is provided
        if (file) {
            const fileUri = getDataUri(file);
            const result = await cloudinary.uploader.upload(fileUri.content, {
                folder: "Products",
            });
            body.file = result.secure_url;
        }

        // Update the product, retaining old fields if they are not provided in the request
        const updatedProduct = await Product.findOneAndUpdate({ _id: productId, owner: userId },{ $set: body },{ new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: error.message });
    }
};


productCltr.updateByAdmin=async(req,res)=>{
    try {
        const userId = req.userId; // Extract user ID from the request
        const productId = req.params.id; // Extract product ID from the request params
        const body = { ...req.body }; // Clone the request body
        const file = req.file;

        // Handle rentalPriceForTime
        if (body.rentalPriceForTime) {
            try {
                body.rentalPriceForTime = JSON.parse(body.rentalPriceForTime);
            } catch (error) {
                return res.status(400).json({ message: "Invalid rentalPriceForTime format" });
            }
        }

        // Handle file upload if a new file is provided
        if (file) {
            const fileUri = getDataUri(file);
            const result = await cloudinary.uploader.upload(fileUri.content, {
                folder: "Products",
            });
            body.file = result.secure_url;
        }

        // Update the product, retaining old fields if they are not provided in the request
        const updatedProduct = await Product.findOneAndUpdate({ _id: productId, owner: userId },{ $set: body },{ new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: error.message });
    }
};


productCltr.delete=async(req,res)=>{
    const id=req.params.id
    try {
        let product
        if(req.role='admin'){
            product=await Product.findByIdAndDelete(id)
        }else{
            product=await Product.findOneAndDelete({_id:id, user:req.userId})
        }
        if(!product){
            res.status(404).json({})
        }
        res.json(product)
    } catch (error) {
        res.json(error)
    }
}


export default productCltr
