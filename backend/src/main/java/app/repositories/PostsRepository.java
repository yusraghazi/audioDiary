package app.repositories;

import app.models.Posts;

import java.util.List;

public interface PostsRepository {
    List<Posts> findAll();
    Posts findById(int id);

    List findPostByUserId(String email);

    Posts save(Posts post);

    void delete(Posts post);
}
