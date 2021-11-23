package app.repositories;

import java.util.List;

public interface JPARepository<T> {
    List<T> findAll();
    T findById(int id);

    T save(T type);

    T deleteById(int id);
}
