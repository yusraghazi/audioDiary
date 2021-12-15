package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyToOne;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity(name = "User")
@NamedQuery(name="find_all_users", query="select u from User u")
public class User {

    @Id
    private String email;
    private String name;
    @JsonIgnore
    private String encodedPassword;
    private boolean admin;
    private String username;
    private String passwordReset;
    private boolean isVerified;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE /* removing a user will remove also his posts */ )
    private List<Posts> posts;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE /* removing a user will remove also his audios */, fetch = FetchType.EAGER)
    private List<Audio> audios;

    public User() {
        posts = new ArrayList<>();
        audios = new ArrayList<>();
    }

    public User(String email, String name, String encodedPassword, boolean admin, String username, String passwordReset, boolean isVerified) {
        this.email = email;
        this.name = name;
        this.encodedPassword = encodedPassword;
        this.admin = admin;
        this.username = username;
        this.passwordReset = passwordReset;
        this.isVerified = isVerified;
    }

    public void addAudio(Audio audio) {
        this.audios.add(audio);
    }

    public void addPost(Posts post) {
        this.posts.add(post);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public void setEncodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordReset() {
        return passwordReset;
    }

    public void setPasswordReset(String passwordReset) {
        this.passwordReset = passwordReset;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public List<Posts> getPosts() {
        return posts;
    }

    public void setPosts(List<Posts> posts) {
        this.posts = posts;
    }

    public List<Audio> getAudios() {
        return audios;
    }

    public void setAudios(List<Audio> audios) {
        this.audios = audios;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return isAdmin() == user.isAdmin() && isVerified() == user.isVerified() && Objects.equals(getEmail(), user.getEmail()) && Objects.equals(getName(), user.getName()) && Objects.equals(getEncodedPassword(), user.getEncodedPassword()) && Objects.equals(getUsername(), user.getUsername()) && Objects.equals(getPasswordReset(), user.getPasswordReset()) && Objects.equals(getPosts(), user.getPosts()) && Objects.equals(getAudios(), user.getAudios());
    }

    public boolean validateEncodedPassword(String given) {
        return encodedPassword.equals(given);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getName(), getEncodedPassword(), isAdmin(), getUsername(), getPasswordReset(), isVerified(), getPosts(), getAudios());
    }
}
