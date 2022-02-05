package app;

import app.exceptions.PostNotFoundException;
import app.models.Posts;
import app.models.User;
import app.repositories.PostsRepository;
import app.repositories.UserRepository;
import app.rest.PostsController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class getPostsTest {

    @MockBean
    PostsController postsController;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostsRepository postsRepository;

    Set<Posts> postsByUserEmail = new HashSet<>();
    String userEmail = "anas@gmail.com";

    @BeforeEach
    void fillArray() {
        ArrayList<Posts> posts = new ArrayList<>(this.postsRepository.findAll());
        for (Posts post : posts) {
            if (Objects.equals(post.getUser().getEmail(), userEmail)) {
                postsByUserEmail.add(post);
            }
        }
    }

    //Anas 1 - Find All Posts
    @Test
    public void findAllPostsTest() throws Exception {
        List<Posts> allPosts = postsController.getAllPosts();
        assertTrue(allPosts.isEmpty());
    }

    //Anas 2 - Find Post By a Given User
    @Test
    void findPostByUser() {
        Set<Posts> set = new HashSet<>(this.postsRepository.findPostByUserId(userEmail));
        assertEquals(set, postsByUserEmail);
    }

    //Anas 3 - Delete Last Created Post
    @Test
    void deletePost() {
        ArrayList<Posts> allPosts = new ArrayList<>(this.postsRepository.findAll());
        Posts postToDelete = allPosts.get(allPosts.size() - 1);
        this.postsRepository.delete(postToDelete);
        Assertions.assertNull(this.postsRepository.findById(postToDelete.getId()));
    }

    //Anas 4
    @Test
    public void TestPostNotFoundExceptions() {
        PostNotFoundException postNotFoundException = assertThrows(PostNotFoundException.class,()->
                this.postsController.getPostById(999));

        assertEquals("Could not find post",postNotFoundException.getMessage());


    }


}
