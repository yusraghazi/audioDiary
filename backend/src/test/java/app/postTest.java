package app;

import app.exceptions.PostNotFoundException;
import app.models.Comment;
import app.models.Posts;
import app.models.User;
import app.repositories.PostsRepository;
import app.rest.PostsController;
import org.junit.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class postTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PostsController postsController;

    @Autowired
    private PostsRepository postsRepository;

    Set<Posts> postsByUserEmail = new HashSet<>();
    String userEmail = "roosbakker@hotmail.com";

    @BeforeEach
    void fillArray() {
        ArrayList<Posts> posts = new ArrayList<>(this.postsRepository.findAll());
        for (Posts post: posts) {
            if (Objects.equals(post.getUser().getEmail(), userEmail)) {
                postsByUserEmail.add(post);
            }
        }
    }

    @Test
    void testCreatingPostShouldSucceed() throws URISyntaxException {
        // Arrange
        User user = new User("janpieter@gmail.com", "Jan Pieter", "951dda5b84bc87b5de5f0baefd0266bcce960753745d6d98add9756eee9a8a73",
                false, "janpieter1988", null, false);
        Posts post = new Posts(null, "Singing", "birds singing in the forest", "test.img", "nature", true, 4, new BigDecimal("4.895168"), new BigDecimal("52.370216"), "Amsterdam, the Netherlands", "audiofile", user, new ArrayList<>());

        // Act: Creating a post
        ResponseEntity<Posts> creationResult
                = this.restTemplate.postForEntity("/posts", post, Posts.class);

        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.CREATED);
        assertNotNull(creationResult.getBody().getId());
        assertEquals(post.getTitle(),creationResult.getBody().getTitle());
        assertEquals(post.getDescription(),creationResult.getBody().getDescription());
        assertEquals(post.getLocation(),creationResult.getBody().getLocation());

        // Act: Cross-check results - was the post persisted?
        ResponseEntity<Posts> queryResult = this.restTemplate.getForEntity("/posts/" + creationResult.getBody().getId(), Posts.class);

        // Assert: Check if data is correct
        assertEquals(queryResult.getStatusCode(), HttpStatus.OK);
        assertEquals(queryResult.getBody().getTitle(), creationResult.getBody().getTitle());
        assertEquals(queryResult.getBody().getDescription(), creationResult.getBody().getDescription());
        assertEquals(queryResult.getBody().getLocation(), creationResult.getBody().getLocation());
    }

    // check if controller works
    @Test()
    void postOfNullShouldCreateException() {
        PostNotFoundException postNotFoundException = assertThrows(PostNotFoundException.class, () ->
        this.postsController.getPostById(9000));
        assertEquals("Could not find post Not found id=9000", postNotFoundException.getMessage());
    }

    // check if repository functions work (save, findbyid, delete, findByUserId)
    @Test()
    void findPostByUser() {
        Set<Posts> set = new HashSet<>(this.postsRepository.findPostByUserId(userEmail));
        assertEquals(set, postsByUserEmail);
    }

    @Test()
    void updateAPost() {
        ArrayList<Posts> posts = new ArrayList<>(this.postsRepository.findAll());
        int indexLastPost = posts.get(posts.size() - 1).getId();
        Posts post = postsRepository.findById(indexLastPost);
        post.setTitle("Test");
        postsRepository.save(post);
        assertEquals(postsRepository.findById(indexLastPost).getTitle(), "Test");
    }

    @Test()
    void removeAPost() {
        ArrayList<Posts> posts = new ArrayList<>(this.postsRepository.findAll());
        Posts lastPost = posts.get(posts.size() - 1);
        this.postsRepository.delete(lastPost);
        assertNull(this.postsRepository.findById(lastPost.getId()));
    }


    //Test Redouan
//    @Test()
//    void getAllPosts(){
//        this.postsRepository.findAll();
//        assertEquals();
//    }


}
