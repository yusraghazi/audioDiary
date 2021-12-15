package app.repositories;

import app.models.Likes;

import java.util.List;

public interface LikeRepository {
    List<Likes> findAll();
    Likes findById(int id);

    Likes save(Likes like);

    Likes deleteById(int id);
}
