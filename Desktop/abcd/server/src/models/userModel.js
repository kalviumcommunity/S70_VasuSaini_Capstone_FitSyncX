import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    validate: [validator.isEmail, 'Please add a valid email'],
  },
  password: {
    type: String,
    required: [function() { return !this.googleId; }, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  picture: {
    type: String,
  },
  height: {
    type: Number,
    required: [true, 'Please add your height in cm'],
  },
  currentWeight: {
    type: Number,
    required: [true, 'Please add your current weight in kg'],
  },
  targetWeight: {
    type: Number,
    required: [true, 'Please add your target weight in kg'],
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'very', 'extra'],
    default: 'moderate',
  },
  goalType: {
    type: String,
    enum: ['lose', 'maintain', 'gain'],
    default: 'maintain',
  },
}, {
  timestamps: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User; 