package za.ac.cput.domain;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String subject;
    private String content;

    protected Message() {
    }
    public Message(Builder builder) {
        this.fullName = builder.fullName;
        this.subject = builder.subject;
        this.content = builder.content;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getSubject() {
        return subject;
    }

    public String getContent() {
        return content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Message message)) return false;
        return Objects.equals(getId(), message.getId()) && Objects.equals(getFullName(), message.getFullName()) && Objects.equals(getSubject(), message.getSubject()) && Objects.equals(getContent(), message.getContent());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getFullName(), getSubject(), getContent());
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", subject='" + subject + '\'' +
                ", content='" + content + '\'' +
                '}';
    }

    public static class Builder {
        private String fullName;
        private String subject;
        private String content;

        public Builder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder subject(String subject) {
            this.subject = subject;
            return this;
        }

        public Builder content(String content) {
            this.content = content;
            return this;
        }

        public Message build() {
            return new Message(this);
        }
    }
}
