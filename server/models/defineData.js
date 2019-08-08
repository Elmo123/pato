import mongoose, { Schema } from 'mongoose';

// Define data schema
var dataSchema = new Schema({
  timestamp: Number,
  flowspeed: Number,
  elevation: Number,
});

// Export Mongoose model
export default mongoose.model('data', dataSchema);