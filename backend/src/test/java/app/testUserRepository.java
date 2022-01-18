package app;

import app.models.User;
import app.repositories.UserRepository;
import app.repositories.UserRepositoryJPA;
import app.rest.UserController;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
// Taner
@RunWith(SpringRunner.class)
@SpringBootTest
public class testUserRepository {


    @Autowired
    UserRepository userRepository;

    @Test
    public void findUser(){
        User userfindEmail = userRepository.findByEmail("c@hotmail.com");
        assertEquals("c@hotmail.com", userfindEmail.getEmail());
        System.out.println("" + userfindEmail.getEmail());
    }


    @Test
    public void updateUser(){
        User updateUser = userRepository.findByEmail("c@hotmail.com");
        updateUser.setUsername("jannie");
        userRepository.save(updateUser);
        updateUser = userRepository.findByEmail("c@hotmail.com");
        assertEquals("jannie", updateUser.getUsername());
        System.out.println("User is updated in the table:\n" + updateUser.getUsername());

    }

    @Test
    public void removeUser() {
        User removeUser = userRepository.findByEmail("gg@g.com");
        userRepository.delete(removeUser);
        assertNull(userRepository.findByEmail("gg@g.com"));
        System.out.println("User is removed in the table:\n" + removeUser.getEmail());
    }










}




