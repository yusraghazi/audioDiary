package app.rest;

import app.exceptions.PostNotFoundException;
import app.models.Comment;
import app.repositories.JPARepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {

    JPARepository<Comment> commentRepo;

    @GetMapping("/comments")
    public List<Comment> getAllComments() {
        return commentRepo.findAll();
    }
    //
    @GetMapping("/comments/{id}")
    public Comment getCommentById(@PathVariable int id) {

        Comment comment = commentRepo.findById(id);
        if(comment == null) {
            throw new PostNotFoundException("Not found id=" + id);
        }
        return comment;
        //return ResponseEntity.ok(post);
    }
}
