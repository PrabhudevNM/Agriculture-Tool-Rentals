import {model,Schema} from 'mongoose'

const paymentSchema = new Schema({

    productId: {
        type:Schema.Types.ObjectId,
        ref: 'Rental',
        required: true,
      },

      productName:{
        type: String,
      },

      amount: {
        type: Number,
        required: true,
      },
     
      transactionId : {
        type : String
    },

      paymentStatus: {
        type: String,
        default: 'pending',
      },

      paymentType: {
        type: String,
        required: true,
      },
},{timestamps:true})

const Payment=model('Payment',paymentSchema)

export default Payment