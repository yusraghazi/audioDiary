package app.repositories;

import app.models.Audio;
import app.models.Posts;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class PostsRepositoryJPA implements PostsRepository {
    @PersistenceContext
    EntityManager em;

    @Override
    public List<Posts> findAll() {
        TypedQuery<Posts> namedQuery = em.createNamedQuery("find_all_posts", Posts.class);

        return namedQuery.getResultList();
    }

    public List findPostByUserId(int userId) {
        Query query = em.createQuery("select p From Posts p WHERE p.user.id = ?1").setParameter(1, userId);
        return query.getResultList();
    }

    @Override
    public Posts findById(int id) {
        return em.find(Posts.class,id);
    }

    @Override
    public Posts save(Posts post) {
        return em.merge(post);
    }

    @Override
    public Posts deleteById(int id) {
        Posts post = findById(id);
        Posts toRemove = em.merge(post);
        em.remove(toRemove);
        return toRemove;
    }
}
