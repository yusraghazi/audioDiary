package app.repositories;

import app.models.Audio;
import app.models.Comment;

import java.util.List;

public interface CommentRepository {
    List<Comment> findAll();
    Comment findById(int id);

    Comment save(Comment comment);

    Comment deleteById(int id);
}
