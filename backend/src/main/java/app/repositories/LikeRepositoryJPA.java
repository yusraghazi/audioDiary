package app.repositories;

import app.models.Likes;
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
public class LikeRepositoryJPA implements LikeRepository {
    @PersistenceContext
    EntityManager em;

    @Override
    public List<Likes> findAll() {
        TypedQuery<Likes> namedQuery = em.createNamedQuery("find_all_likes", Likes.class);
        return namedQuery.getResultList();
    }

    @Override
    public Likes findById(Integer id) {
        return em.find(Likes.class,id);
    }

    @Override
    public List<Likes> findLikeByUser(String email) {
        TypedQuery<Likes> query = em.createQuery("select l From Likes l WHERE l.user.email = ?1", Likes.class);
        query.setParameter(1, email);
        return query.getResultList();
    }

    @Override
    public Likes save(Likes like) {
        return em.merge(like);
    }

    @Override
    public void deleteById(int id) {
        Likes toRemove = em.find(Likes.class,id);
        em.remove(toRemove);
    }
}
