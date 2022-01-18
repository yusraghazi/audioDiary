package app;

import app.exceptions.CommentNotFoundException;
import app.models.Comment;
import app.models.Posts;
import app.models.User;
import app.repositories.CommentRepository;
import app.repositories.PostsRepository;
import app.repositories.UserRepository;
import app.rest.CommentController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(SpringRunner.class)
@SpringBootTest
public class testComments {

    @Autowired
    CommentRepository commentRepository;


    @Autowired
    UserRepository userRepository;

    @Autowired
    PostsRepository postsRepository;

    @Autowired
    CommentController commentController;


    @Test
    public void findComment(){
        Comment comment = commentRepository.findById(61);
        assertEquals("this is so bad delete this please", comment.getDescription());
        System.out.println(comment);
    }

    @Test
    public void addComment() {
        User user = userRepository.findByEmail("Altaaf@gmail.com");
        Posts post = postsRepository.findById(146);
        Comment comment = new Comment(1, post, user, "No this is a nice sound");


        Comment add = commentRepository.save(comment);

        assertEquals("No this is a nice sound", add.getDescription());
        System.out.println("a new comment has been created with id on post " + post.getTitle());
    }



    @Test
    public void testExeptionThrowing(){
        CommentNotFoundException commentNotFoundException = assertThrows(CommentNotFoundException.class, () ->
            this.commentController.getCommentById(9999));
        assertEquals("Could not find comment Not found id=9999", commentNotFoundException.getMessage());
    }





}
