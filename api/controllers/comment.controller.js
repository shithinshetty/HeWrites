import Comment from "../modals/comment.modal.js";
import { errorHandler } from "../utils/err.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.userId) {
      return next(errorHandler(403, "You Are Not Authorized To Comment"));
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comment = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const likecomment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "Comment Not Found"));
    }
    const isLiked = comment.likes.indexOf(req.user.userId);
    if (isLiked === -1) {
      comment.likes.push(req.user.userId);
      comment.numberOfLikes += 1;
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(isLiked, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {}
};
