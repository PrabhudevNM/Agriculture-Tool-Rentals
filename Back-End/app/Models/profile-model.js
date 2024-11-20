import {model,Schema} from 'mongoose'

const ProfileSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    default: null,  // Initially, no image is uploaded
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  user:Schema.Types.ObjectId

});

const Profile = model('Profile', ProfileSchema);

export default Profile
