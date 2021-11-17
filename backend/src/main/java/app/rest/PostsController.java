package app.rest;
import app.exceptions.PostNotFoundException;
import app.models.Posts;
import app.repositories.PostsRepository;
import app.repositories.PostsRepositoryMock;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class PostsController {
    private PostsRepository postsRepository = new PostsRepositoryMock();

    @GetMapping("/posts")
    public List<Posts> getAllEvents() {
        return postsRepository.findAll();
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Posts> getEventById(@PathVariable int id) {

        Posts post = postsRepository.findById(id);
        if(post == null) {
            throw new PostNotFoundException("Not found id=" + id);
        }
        return ResponseEntity.ok(post);
    }

    @PostMapping("/posts")
    public ResponseEntity<Posts> createAEvent(@RequestBody Posts post) {
        Posts savedPost = postsRepository.save(post);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedPost.getId()).toUri();
        return ResponseEntity.created(location).body(savedPost);
    }

    @PutMapping("/posts/{id}")
    public ResponseEntity<Posts> updateEvent(@PathVariable int id) {

        Posts post = postsRepository.findById(id);
        if(post == null) {
            throw new PostNotFoundException("id="+id);
        }
        postsRepository.save(post);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Posts> deleteUser(@PathVariable int id) {

        Posts post = postsRepository.deleteById(id);
        if(post == null) {
            throw new PostNotFoundException("id=" + id);
        }
        return ResponseEntity.ok(post);

    }

}
