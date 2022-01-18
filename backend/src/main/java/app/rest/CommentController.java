package app.rest;

import app.exceptions.CommentNotFoundException;
import app.exceptions.PostNotFoundException;
import app.models.Comment;
import app.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class CommentController {

    @Autowired
    CommentRepository commentRepo;

    @GetMapping("/posts/{postId}/comments")
    public List findCommentByPostId(@PathVariable int postId) {
        return commentRepo.findCommentByPostId(postId);
    }

    @GetMapping("/posts/comments")
    public List<Comment> getAllComments() {
        return commentRepo.findAll();
    }

    @GetMapping("/comments/{id}")
    public Comment getCommentById(@PathVariable int id) {

        Comment comment = commentRepo.findById(id);
        if(comment == null) {
            throw new CommentNotFoundException("Not found id=" + id);
        }
        return comment;
        //return ResponseEntity.ok(post);
    }

    @PostMapping("/comments")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment savedComment = commentRepo.save(comment);
        URI location = ServletUriComponentsBuilder.
                fromCurrentRequest().path("/{id}").
                buildAndExpand(savedComment.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
