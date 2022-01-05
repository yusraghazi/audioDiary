package app.repositories;

import app.models.Audio;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class AudioRepositoryJPA implements AudioRepository {
    @PersistenceContext
    EntityManager em;

    @Override
    public List<Audio> findAll() {
        TypedQuery<Audio> namedQuery = em.createNamedQuery("find_all_audios", Audio.class);
        return namedQuery.getResultList();
    }

    @Override
    public Audio findById(int id) {
        return em.find(Audio.class,id);
    }

    @Override
    public Audio save(Audio audio) {
        return em.merge(audio);
    }

    @Override
    public Audio deleteById(int id) {
        Audio audio = findById(id);
        Audio toRemove = em.merge(audio);
        em.remove(toRemove);
        return toRemove;
    }
}
