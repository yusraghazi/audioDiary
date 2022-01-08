package app.rest;

import app.exceptions.PostNotFoundException;
import app.models.Comment;
import app.models.Likes;
import app.models.Posts;
import app.repositories.JPARepository;
import app.repositories.LikeRepository;
import app.repositories.LikeRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class LikeController {

    @Autowired
    LikeRepositoryJPA likeRepo;

    @GetMapping("/likes")
    public List<Likes> getAllLikes() {
        return likeRepo.findAll();
    }

    @GetMapping("/likes/{id}")
    public Likes getLikeById(@PathVariable int id) {

        Likes like = likeRepo.findById(id);
        if(like == null) {
            throw new PostNotFoundException("Not found id=" + id);
        }
        return like;
    }

//    @GetMapping("/likes/{email}")
//    public Likes<Likes[]> getLikedPostsByUser(@PathVariable String email) {
//
//    }

    @PostMapping("/likes")
    public ResponseEntity<Comment> createLike(@RequestBody Likes like) {
        Likes savedLike = likeRepo.save(like);
        URI location = ServletUriComponentsBuilder.
                fromCurrentRequest().path("/{id}").
                buildAndExpand(savedLike.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/likes/{id}")
    public ResponseEntity<Likes> removeLike(@PathVariable int id) {
        Likes like = likeRepo.findById(id);
        likeRepo.deleteById(id);
        return ResponseEntity.ok(like);
    }

}
