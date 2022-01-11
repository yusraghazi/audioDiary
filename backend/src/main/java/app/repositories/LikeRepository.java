package app.repositories;

import app.models.Likes;

import java.util.List;

public interface LikeRepository {
    List<Likes> findAll();
    Likes findById(Integer id);
    List<Likes> findLikeByUser(String email);
    Likes save(Likes like);

    void deleteById(int id);
}
