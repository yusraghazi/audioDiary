package app.models;

import org.hibernate.annotations.LazyToOne;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@NamedQuery(name="find_all_users", query="select u from User u")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String username;
    private String email;
    private String password;
    private String passwordReset;
    private boolean isAdmin;
    private boolean isVerified;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE /* removing a user will remove also his posts */)
    private List<Posts> posts;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE /* removing a user will remove also his audios */)
    private List<Audio> audios;

    public User() {
        posts = new ArrayList<>();
        audios = new ArrayList<>();
    }

    public User(Integer id, String name, String username, String email, String password, String passwordReset, boolean isAdmin, boolean isVerified) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordReset = passwordReset;
        this.isAdmin = isAdmin;
        this.isVerified = isVerified;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordReset() {
        return passwordReset;
    }

    public void setPasswordReset(String passwordReset) {
        this.passwordReset = passwordReset;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public List<Audio> getAudios() {
        return audios;
    }

    public void setAudios(List<Audio> audios) {
        this.audios = audios;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Posts> getPosts() {
        return posts;
    }

    public void addPost(Posts post) {
        this.posts.add(post);
    }

    public void addAudio(Audio audio) {
        this.audios.add(audio);
    }

    private void setPosts(List<Posts> posts) {
        this.posts = posts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
