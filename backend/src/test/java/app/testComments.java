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

    //Written by Altaaf
    @Test
    public void findComment() {
        Comment comment = commentRepository.findById(69);
        assertEquals("this is so bad delete this please", comment.getDescription());
        System.out.println(comment);
    }

    //Written by Altaaf
    @Test
    public void addComment() {
        User user = userRepository.findByEmail("Altaaf@gmail.com");
        Posts post = postsRepository.findById(24);

        //create a new comment component
        Comment comment = new Comment(1, post, user, "No this is a nice sound");

        //send comment to database via repository
        Comment add = commentRepository.save(comment);

        assertEquals("No this is a nice sound", add.getDescription());
        System.out.println("a new comment has been created on post " + post.getTitle());

        //delete the comment after testing
        commentRepository.deleteById(add.getId());

    }


    //Written by Altaaf
    @Test
    public void testExeptionThrowing() {
        //throw exeption when comment is not found
        CommentNotFoundException commentNotFoundException = assertThrows(CommentNotFoundException.class, () ->
                this.commentController.getCommentById(9999));
        assertEquals("Could not find comment Not found id=9999", commentNotFoundException.getMessage());
    }


}
