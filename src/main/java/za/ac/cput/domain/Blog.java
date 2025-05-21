package za.ac.cput.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(length = 5000)
    private String content;
    private String videoUrl;
    private LocalDateTime createdAt;

    // Constructors
    protected Blog() {}

    private Blog(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.content = builder.content;
        this.videoUrl = builder.videoUrl;
        this.createdAt = builder.createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Blog blog)) return false;
        return Objects.equals(getId(), blog.getId()) && Objects.equals(getTitle(), blog.getTitle()) && Objects.equals(getContent(), blog.getContent()) && Objects.equals(getVideoUrl(), blog.getVideoUrl()) && Objects.equals(getCreatedAt(), blog.getCreatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getTitle(), getContent(), getVideoUrl(), getCreatedAt());
    }

    @Override
    public String toString() {
        return "Blog{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", videoUrl='" + videoUrl + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    public String setTitle(String title) {
        this.title = title;
        return title;
    }

    public static class Builder {
        private Long id;
        private String title;
        private String content;
        private String videoUrl;
        private LocalDateTime createdAt;

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder content(String content) {
            this.content = content;
            return this;
        }

        public Builder videoUrl(String videoUrl) {
            this.videoUrl = videoUrl;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Blog build() {
            return new Blog(this);
        }
    }
}
