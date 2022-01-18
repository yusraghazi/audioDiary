package app;


import app.models.Likes;
import app.models.Posts;
import app.models.User;
import app.repositories.LikeRepository;
import app.repositories.PostsRepository;
import app.repositories.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
public class testLikes {


    @Autowired
    UserRepository userRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    PostsRepository postsRepository;


    //Written by Altaaf
    @Test
    public void amountOfLikeByUser() {
        // user with email like.email@gmail.com has liked 4 posts

        //Get list of all the liked posts from the user
        List<Likes> like = likeRepository.findLikeByUser("like.email@gmail.com");

        //get the amount of posts
        int amountLikes = like.size();

        assertEquals(4, amountLikes);

        System.out.println("the amount of likes by the user:" + amountLikes);

    }


    //written by Altaaf
    @Test
    public void testDeleteLike() {

        int id = 1;
        User user = userRepository.findByEmail("Altaaf@gmail.com");
        Posts post = postsRepository.findById(106);

        //create a new like object
        Likes like = new Likes(id, post, user);

        //first post an like to the database
        Likes addLike = likeRepository.save(like);

        System.out.println("user has likes on: " + like.getPost().getTitle());
        System.out.println("the id of the like is: " + addLike.getId());

        //then delete the posted like from the database
        likeRepository.deleteById(addLike.getId());
        System.out.println("the like has now been deleted");

    }


}
