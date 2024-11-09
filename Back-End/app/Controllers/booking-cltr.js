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
    const body = req.body;

    // Ensure that the booking data includes user and product details
    const bookingData = {
      ...body,
      user: req.userId,                    // Associate the booking with the logged-in user
      productId: body.productId,            // Ensure productId is taken from req.body if passed
      transactionId: body.transactionId || 'pending', // Assign transactionId if provided, else set as pending
    };

    const booking = new Booking(bookingData); // Create a new booking document
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
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