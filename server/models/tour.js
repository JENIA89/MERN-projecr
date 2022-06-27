import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
}, 
{
  writeConcern: {
     w: 'majority',
     j: true,
     wtimeout: 1000
  }
});

export default mongoose.model("Tour", tourSchema);