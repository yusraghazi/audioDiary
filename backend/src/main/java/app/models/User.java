package app.models;

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

    private Date birthDate;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE /* removing a user will remove also his posts */)
    private List<Posts> posts;

    public User() {
        posts = new ArrayList<>();
    }

    public User(String name, Date birthDate) {
        setName(name);
        setBirthDate(birthDate);
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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public List<Posts> getPosts() {
        return posts;
    }

    public void addPost(Posts post) {
        this.posts.add(post);
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
