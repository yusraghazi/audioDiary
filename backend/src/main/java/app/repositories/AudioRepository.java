package app.repositories;

import app.models.Audio;

import java.util.List;

public interface AudioRepository {
    List<Audio> findAll();
    Audio findById(int id);

    Audio save(Audio audio);

    Audio deleteById(int id);
}
