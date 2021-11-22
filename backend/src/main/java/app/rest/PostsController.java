package app.rest;
import app.exceptions.PostNotFoundException;
import app.models.Posts;
import app.models.User;
import app.repositories.PostsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

@RestController
public class PostsController {
    @Autowired
    private UserController userResource;

    @Autowired
    private PostsRepository postRepo;

    @GetMapping("/rest/users/{id}/posts")
    public List<Posts> getPosts(@PathVariable int id) {

        User user = userResource.getUserById(id);

        return user.getPosts();
    }

    @PostMapping("/rest/users/{id}/posts")
    @Transactional
    public ResponseEntity<Object> createPost(@RequestParam(name = "fail",required = false, defaultValue = "false") boolean shouldFail,
                                             @PathVariable int id, @RequestBody Posts post) {

        User user = userResource.getUserById(id);

        post.setUser(user);

        postRepo.save(post);

        // used to demonstrate transaction handling
        if(shouldFail) {
            throw new RuntimeException("Failed for demo purposes. This action will rollback the database transaction");
        }

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{postId}").buildAndExpand(post.getId()).toUri();

        return ResponseEntity.created(location).build();
    }
//    private PostsRepository postsRepository = new PostsRepositoryMock();
//
//    @GetMapping("/posts")
//    public List<Posts> getAllEvents() {
//        return postsRepository.findAll();
//    }
//
//    @GetMapping("/posts/{id}")
//    public ResponseEntity<Posts> getEventById(@PathVariable int id) {
//
//        Posts post = postsRepository.findById(id);
//        if(post == null) {
//            throw new PostNotFoundException("Not found id=" + id);
//        }
//        return ResponseEntity.ok(post);
//    }
//
//    @PostMapping("/posts")
//    public ResponseEntity<Posts> createAEvent(@RequestBody Posts post) {
//        Posts savedPost = postsRepository.save(post);
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedPost.getId()).toUri();
//        return ResponseEntity.created(location).body(savedPost);
//    }
//
//    @PutMapping("/posts/{id}")
//    public ResponseEntity<Posts> updateEvent(@PathVariable int id) {
//
//        Posts post = postsRepository.findById(id);
//        if(post == null) {
//            throw new PostNotFoundException("id="+id);
//        }
//        postsRepository.save(post);
//        return ResponseEntity.ok(post);
//    }
//
//    @DeleteMapping("/posts/{id}")
//    public ResponseEntity<Posts> deleteUser(@PathVariable int id) {
//
//        Posts post = postsRepository.deleteById(id);
//        if(post == null) {
//            throw new PostNotFoundException("id=" + id);
//        }
//        return ResponseEntity.ok(post);
//
//    }

}
