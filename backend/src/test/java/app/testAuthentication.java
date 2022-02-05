package app;

import app.models.User;
import app.repositories.UserRepository;

import app.security.JWTokenInfo;
import app.security.JWTokenUtils;
import app.security.PasswordEncoder;

import org.junit.Test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Date;


import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc


public class testAuthentication {

    @Autowired
    private PasswordEncoder encoder;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTokenUtils tokenUtils;

    @Autowired
    private MockMvc mvc;

    @Test
    public void setEncodedPassword(){
        //
        String password = "welkom123";
        String encodedPassword = encoder.encode(password);
        encoder.encode(password);
        assertNotEquals(encodedPassword,password);
        System.out.println("Password: "+password+" is encoded: "+encodedPassword);
    }

    @Test
    public void decodePassword(){
        String password = "HVA2022!mypass";
        String encodedPassword = encoder.encode(password);

        User user = new User("user9@userdairy.com","User Nine",encodedPassword,false,"user9",null,true);
        User addUser = userRepository.save(user);
        userRepository.save(addUser);

        assertEquals(encoder.encode("HVA2022!mypass"),addUser.getEncodedPassword());

        System.out.println("It can match the password with the encodedpassword from the database");

    }

    @Test
    public void shouldGenerateAuthToken() throws Exception {
        String token = tokenUtils.encode("admin",true);

        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.get("/test").header("Authorization", token)).andExpect(status().isOk());
    }
    @Test
    public void getTokenInfo()  {
        String token = tokenUtils.encode("admin",true);
        JWTokenInfo tokenInfo = tokenUtils.decode(token, true);


        assertNotNull(tokenInfo);
        System.out.println("TokenInfo: " +tokenInfo);
    }

    @Test
    public void shouldRenewableToken(){
        String token = tokenUtils.encode("admin",true);
        JWTokenInfo tokenInfo = tokenUtils.decode(token, true);
        tokenInfo.setExpiration(new Date());
        assertEquals(true,tokenUtils.isRenewable(tokenInfo));
        System.out.println("Should get a new Token because Method isRenewable is "+tokenUtils.isRenewable(tokenInfo));
        System.out.println("Token expired a few seconds ago "+ tokenInfo.getExpiration());

    }



}




