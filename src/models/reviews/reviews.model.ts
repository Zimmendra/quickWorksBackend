import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    worker_id: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    star_review: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
