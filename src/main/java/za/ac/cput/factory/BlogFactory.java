package za.ac.cput.factory;

import za.ac.cput.domain.Blog;

import java.time.LocalDateTime;

public class BlogFactory {
    public static Blog createBlog(String title, String content, String videoUrl) {
        if (title == null || title.isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }
        if (videoUrl == null || videoUrl.isEmpty()) {
            throw new IllegalArgumentException("Video URL cannot be null or empty");
        }

        return new Blog.Builder()
                .title(title)
                .content(content)
                .videoUrl(videoUrl)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
