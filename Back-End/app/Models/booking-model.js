
import {model,Schema} from 'mongoose'   // this for while taking rent the product of a user or product taking,
                                    
const bookingSchema = new Schema({

  productName:{
    type:String,
  },
  
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products' // Ensure this matches your Product collection name
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: 'users' // Match the user model reference name
      },

    rentalPriceForTime:[  
      {
        period:String, 
        price:Number,  
      },
    ],
  
    
    transactionId : {
        type : String
    },

},
{timestamps : true}
)

  
const Booking = model('Booking', bookingSchema);
export default Booking





//---------------------------------------------------------------------------------------------------------------------
  

//   totalTime: {
    //     type: String,
    //     enum: ['day', 'week', 'month'], // Use enum to specify the valid options
    //   },

    // totalAmount : {
    //     type : Number
    // },