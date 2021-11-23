package app.rest;

import app.exceptions.UserNotFoundException;
import app.models.Audio;
import app.models.Posts;
import app.models.User;
import app.repositories.AudioRepository;
import app.repositories.JPARepository;
import app.repositories.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;

@RestController
public class AudioController {
    @Autowired
    private UserController userResource;

    @Autowired
    private JPARepository<Audio> audioRepository;

    @PostMapping("/rest/users/{id}/audios")
    @Transactional
    public ResponseEntity<Object> createAudio(@RequestParam(name = "fail",required = false, defaultValue = "false") boolean shouldFail,
                                             @PathVariable int id, @RequestBody Audio audio) {

        User user = userResource.getUserById(id);

        audio.setUser(user);

        audioRepository.save(audio);

        // used to demonstrate transaction handling
        if(shouldFail) {
            throw new RuntimeException("Failed for demo purposes. This action will rollback the database transaction");
        }

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{postId}").buildAndExpand(audio.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/rest/audios/{id}")
    public Audio getAudioById(
            @PathVariable int id) {

        Audio audioById = audioRepository.findById(id);

        if (audioById == null) {
            throw new UserNotFoundException("id = " + id);
        }

        return audioById;
    }
}
