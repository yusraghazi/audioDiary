package app.repositories;

import app.models.User;

import java.util.List;

public interface UserRepository {
    User save(User user);

    void delete(User user);

    User findByEmail(String email);

    List<User> findAll();
}
