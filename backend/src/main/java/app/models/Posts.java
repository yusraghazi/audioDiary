package app.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import java.util.Objects;

@Entity
@NamedQuery(name="find_all_posts", query="select p from Posts p")
public class Posts {

    public enum Theme {
        SUN,
        SAND,
        FOREST,
        WATER,
        CITY,
        MOUNTAIN
    }

    @Id
    @GeneratedValue
    public Integer id;
    public String title;
    public String description;
    public String img;
    public Theme theme;
    public boolean isLiked;

    public Posts() {}

    public Posts(Integer id, String title, String description, String img, Theme theme, boolean isLiked) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.img = img;
        this.theme = theme;
        this.isLiked = isLiked;
    }

    public Integer getId() {
        return id;
    }

    public static Posts createRandomPosts() {
        return new Posts(null, "Bird sounds", "The birds singing at Amsterdamsche Bos", "amazon.jpg",
                Theme.SUN, true);
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public boolean isLiked() {
        return isLiked;
    }

    public void setLiked(boolean liked) {
        isLiked = liked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Posts)) return false;
        Posts posts = (Posts) o;
        return isLiked() == posts.isLiked() && Objects.equals(getId(), posts.getId()) && Objects.equals(getTitle(), posts.getTitle()) && Objects.equals(getDescription(), posts.getDescription()) && Objects.equals(getImg(), posts.getImg()) && getTheme() == posts.getTheme();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getDescription(), getImg(), getTheme(), isLiked());
    }
}
