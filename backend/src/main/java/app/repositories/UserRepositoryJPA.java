package app.repositories;

import app.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UserRepositoryJPA implements JPARepository<User> {
    @Autowired
    private EntityManager em;

    @Override
    public User save(User user) {
        return em.merge(user);
    }

    @Override
    public User findById(int id) {

        return em.find(User.class,id);
    }

    @Override
    public List<User> findAll() {
        TypedQuery<User> namedQuery = em.createNamedQuery("find_all_users", User.class);

        return namedQuery.getResultList();
    }

    @Override
    public User deleteById(int id) {
        User user = this.findById(id);
        User toRemove = em.merge(user);
        em.remove(toRemove);
        return user;
    }
}
