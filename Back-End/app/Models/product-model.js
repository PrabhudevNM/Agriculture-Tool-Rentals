
import {model, Schema} from 'mongoose'  //this for only show the product

const productSchema = new Schema({

  title: {
    type: String,
  },
  
  description: {
    type: String,
    required: true,            
  },

  file:
    {
     type: String, 
     required: true 
   },
  
  
  owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
  },

  rentalPriceForTime:[  //if pass objects id wont create in db
    {
      period:{
        type:String,
        required: true,
        enum:['day', 'week', 'month']}, 

      price:{
        type:Number
      }  
    },
  ],

  category: {
    type: String,
    required: true,
    enum: ['tractor', 'tractor tool'], // Define the valid categories
  },

  
}, { timestamps: true });

const Product = model('Product', productSchema);

export default Product
