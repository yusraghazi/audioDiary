package app;

import app.models.User;
import app.rest.UserController;
import io.jsonwebtoken.lang.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

// Taner
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class getAllUsersTest {

    @MockBean
    UserController userController;

    @Test
    public void findAllUsersTest() throws Exception{
        List<User> allUsers = userController.getAllUsers();
        // asserts that a list is not empty
        assertThat(allUsers.isEmpty());
    }



}
