package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@NamedQuery(name="find_all_audios", query="select a from Audio a")
public class Audio {

    @Id
    @GeneratedValue
    public Integer id;
    public String filename;
    public String description;
    public int location;
    public double duration;

    @ManyToOne(fetch = FetchType.EAGER)
   // @JsonIgnore
    private User user;

    public void setUser(User user) {
        this.user = user;
        user.addAudio(this);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLocation() {
        return location;
    }

    public void setLocation(int location) {
        this.location = location;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }
}
