package app.rest;
import app.exceptions.PostNotFoundException;
import app.models.Posts;
import app.repositories.PostsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class PostsController {
//    @Autowired
//    private UserController userResource;

    @Autowired
    private PostsRepository postRepo;


    @PostMapping("/posts")
    public ResponseEntity<Posts> createPost(@RequestBody Posts post) {

        Posts savedPost = postRepo.save(post);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedPost.getId()).toUri();

        return ResponseEntity.created(location).body(savedPost);
    }

    @GetMapping("/posts")
    public List<Posts> getAllPosts() {
        return postRepo.findAll();
    }

    @GetMapping("/posts/{id}")
    public Posts getPostById(@PathVariable int id) {

        Posts post = postRepo.findById(id);
        if(post == null) {
            throw new PostNotFoundException("Not found id=" + id);
        }
        return post;
    }

    @GetMapping("users/{email}/posts")
    public List<Posts> findPostByUserId(@PathVariable String email) {
        return postRepo.findPostByUserId(email);
    }


    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Posts> deleteUser(@PathVariable int id) {

        Posts post = postRepo.findById(id);
        postRepo.delete(post);
        return ResponseEntity.ok(post);

    }
}
