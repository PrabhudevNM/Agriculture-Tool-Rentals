import Booking from "../Models/booking-model.js";
const bookingCltr={}

bookingCltr.list=async(req,res)=>{
  try {
    const bookings=await Booking.find()
    res.status(200).json(bookings)
  } catch (error) {
    console.log(error)
    res.status(500).json({})
  }
}

bookingCltr.create = async (req, res) => {
  try {
    const body = req.body
    // req.body.transactionId='1234'
    const product = new Booking(body);
    product.user=req.userId
    product.productId=req.userId
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
    });
  }
};


bookingCltr.show = async (req, res) => {
  try {
    const bookings = await Booking.find({user:req.userId})
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
};

export default bookingCltr