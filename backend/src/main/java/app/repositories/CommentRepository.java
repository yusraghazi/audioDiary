package app.repositories;

import app.models.Audio;
import app.models.Comment;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository {
    List<Comment> findAll();
    Comment findById(int id);

    List findCommentByPostId(int postId);

    Comment save(Comment comment);

    Comment deleteById(int id);
}
