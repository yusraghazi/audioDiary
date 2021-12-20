package app.rest;
import app.exceptions.PostNotFoundException;
import app.models.Audio;
import app.models.Posts;
import app.models.User;
import app.repositories.PostsRepository;

import app.repositories.PostsRepositoryJPA;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
    private AudioController audioResource;

    @Autowired
    private PostsRepository postRepo;

    private PostsRepositoryJPA postsPostsRepositoryJPA;

//    @GetMapping("/posts/{id}")
//    public List<Posts> getPosts(@PathVariable int id) {
//
//        User user = userResource.getUserById(id);
//
//        return user.getPosts();
//    }

    @PostMapping("/posts")
    public ResponseEntity<Object> createPost(@RequestBody Posts post) {

        Posts savedPost = postRepo.save(post);

        URI location = ServletUriComponentsBuilder.
                fromCurrentRequest().path("/{id}").
                buildAndExpand(savedPost.getId()).toUri();

        return ResponseEntity.created(location).build();
    }
//    private PostsRepository postsRepository = new PostsRepositoryMock();
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
        //return ResponseEntity.ok(post);
    }

    @GetMapping("users/{email}/posts")
    public List findPostByUserId(@PathVariable String email) {
        return postRepo.findPostByUserId(email);
    }


    // TEST
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
