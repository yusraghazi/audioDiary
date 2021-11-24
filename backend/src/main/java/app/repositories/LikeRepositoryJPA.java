package app.repositories;

import app.models.Likes;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class LikeRepositoryJPA implements LikeRepository {
    @PersistenceContext
    EntityManager em;

    @Override
    public List<Likes> findAll() {
        return null;
    }

    @Override
    public Likes findById(int id) {
        return null;
    }

    @Override
    public Likes save(Likes like) {
        return null;
    }

    @Override
    public Likes deleteById(int id) {
        return null;
    }
}
