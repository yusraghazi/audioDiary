package app.repositories;

import app.models.Audio;
import app.models.Comment;

import java.util.List;

public class CommentRepositoryJPA implements JPARepository<Comment> {
    @Override
    public List<Comment> findAll() {
        return null;
    }

    @Override
    public Comment findById(int id) {
        return null;
    }

    @Override
    public Comment save(Comment comment) {
        return null;
    }

    @Override
    public Comment deleteById(int id) {
        return null;
    }
}
