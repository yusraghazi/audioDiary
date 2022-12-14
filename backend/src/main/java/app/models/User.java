package app.models;

import javax.persistence.*;
import java.util.*;

@Entity(name = "AudioUser")
@NamedQuery(name="find_all_users", query="select u from AudioUser u")
public class User {

    @Id
    private String email;
    private String name;
    private String encodedPassword;

    private boolean admin;
    private String username;
    private String passwordReset;
    private boolean isVerified;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE /* removing a user will remove also his posts */ )
    private List<Posts> posts;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE /* removing a user will remove also his audios */, fetch = FetchType.EAGER)
    private Set<Comment> comments;

    public User() {
        posts = new ArrayList<>();
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

    public boolean isAdmin() {
        return admin;
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

    public void setPosts(List<Posts> posts) {
        this.posts = posts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return isAdmin() == user.isAdmin() && isVerified() == user.isVerified() && Objects.equals(getEmail(), user.getEmail()) && Objects.equals(getName(), user.getName()) && Objects.equals(getEncodedPassword(), user.getEncodedPassword()) && Objects.equals(getUsername(), user.getUsername()) && Objects.equals(getPasswordReset(), user.getPasswordReset());
    }

    public boolean validateEncodedPassword(String given) {
        return encodedPassword.equals(given);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEmail(), getName(), getEncodedPassword(), isAdmin(), getUsername(), getPasswordReset(), isVerified());
    }
}
