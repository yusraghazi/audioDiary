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

    public List findPostByUserId(String email) {
        Query query = em.createQuery("select p From Posts p WHERE p.user.email = ?1").setParameter(1, email);
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


  public Posts createNewPost(int id){
        Query query = em.createNativeQuery("insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
        em.getTransaction().begin();
        query.setParameter(1, id);
        query.setParameter(2, 5);
        query.setParameter(3, "dit is een post om de insert te testen");
        query.setParameter(4, "river.jpg");
        query.setParameter(5, true);
        query.setParameter(6, "Theme.SUN");
        query.setParameter(7, "test post ");
        query.setParameter(8, 2);
        query.setParameter(9, 1);
        query.executeUpdate();
        em.getTransaction().commit();
      return null;
  }
}
