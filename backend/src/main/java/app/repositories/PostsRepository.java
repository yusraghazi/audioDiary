package app.repositories;

import app.models.Posts;

import java.util.List;

public interface PostsRepository {
    List<Posts> findAll();
    Posts findById(int id);

    Posts save(Posts aEvent);

    Posts deleteById(int id);
}
