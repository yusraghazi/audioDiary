package app.repositories;

import app.models.Comment;

import java.util.List;

public interface CommentRepository {
    List<Comment> findAll();
    Comment findById(int id);

    List findCommentByPostId(int postId);

    Comment save(Comment comment);

    Comment deleteById(int id);
}
