package app;

/**
 * all Tests Written by:
 *
 * @outhor redouanassakali
 */

import app.exceptions.AuthenticationException;
import app.exceptions.CommentNotFoundException;
import app.exceptions.PostNotFoundException;
import app.exceptions.UserNotFoundException;
import app.models.User;
import app.repositories.PostsRepository;
import app.repositories.UserRepository;
import app.security.JWTokenInfo;
import app.security.JWTokenUtils;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc


public class testExceptions {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JWTokenUtils tokenUtils;

    @Test
    public void shouldTrowUserNotFoundExcecption() throws Exception {
        //Arrange
        String exceptionParam = "not_found";

        //Act
        mvc.perform(get("/users/not@here.com",exceptionParam)
                        .contentType(MediaType.APPLICATION_JSON))
        //Assert
                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof UserNotFoundException))
      .andExpect(result -> assertEquals("404 NOT_FOUND", result.getResolvedException().getMessage()));
    }

    @Test
    public void postNotFound() throws Exception {
        //Arrange
        String exceptionParam = "not_found";

        //Act
        mvc.perform(get("/posts/99999",exceptionParam)
                        .contentType(MediaType.APPLICATION_JSON))
        //Assert

                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof PostNotFoundException))
                .andExpect(result -> assertEquals("Could not find post Not found id=99999", result.getResolvedException().getMessage()));
    }

    @Test
    public void commentNotFound() throws Exception {

        mvc.perform(get("/comments/99999")
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isNotFound())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof CommentNotFoundException))
                .andExpect(result -> assertEquals("Could not find comment Not found id=99999", result.getResolvedException().getMessage()));
    }



    @Test(expected = AuthenticationException.class)
    public void shouldTrowAuthExeption() {

      tokenUtils.decode("THISaFAKEAUTH", true);

    }

}


