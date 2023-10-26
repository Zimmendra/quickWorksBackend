import { IReview } from '../models/reviews/IReview';
import reviewModel from '../models/reviews/reviews.model';

const createReview = async (dto: IReview) => {
  try {
    //   const existWorker = await workerModel.findOne({ _id: dto.worker_id });

    //   if (!existWorker) {
    //     throw 'existWorker not found';

    const review = await reviewModel.create(dto);
    return review;
  } catch (err: any) {
    throw err;
  }
};

const getReview = async (id: string) => {
  try {
    const review = await reviewModel.find({ user_id: id });
    return review;
  } catch (err: any) {
    throw err;
  }
};

const updateReview = async (
  review_id: string,
  comment: string,
  star_review: number,
) => {
  try {
    const review = await reviewModel.updateOne(
      { _id: review_id },
      { comment: comment, star_review: star_review },
    );
    return review;
  } catch (err: any) {
    throw err;
  }
};

const deleteReview = async (id: string) => {
  try {
    const review = await reviewModel.findByIdAndDelete(id);
    return review;
  } catch (err: any) {
    throw err;
  }
};

export default { createReview, getReview, updateReview, deleteReview };
