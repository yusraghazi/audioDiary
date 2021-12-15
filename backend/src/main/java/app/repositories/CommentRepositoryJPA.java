package app.repositories;

import app.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class CommentRepositoryJPA implements CommentRepository {
    @Autowired
    EntityManager em;

    @Override
    public List<Comment> findAll() {
        TypedQuery<Comment> namedQuery = em.createNamedQuery("find_all_comments", Comment.class);
        return namedQuery.getResultList();
    }

    public List findCommentByPostId(int postId) {
        Query query = em.createQuery("select c From Comment c WHERE c.post.id = ?1").setParameter(1, postId);
        return query.getResultList();
    }

    @Override
    public Comment findById(int post) {
        return em.find(Comment.class,post);
    }

    @Override
    public Comment save(Comment comment) {
        return em.merge(comment);
    }

    @Override
    public Comment deleteById(int id) {
        Comment comment = findById(id);
        Comment toRemove = em.merge(comment);
        em.remove(toRemove);
        return toRemove;
    }
}
