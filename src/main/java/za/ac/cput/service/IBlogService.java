package za.ac.cput.service;

import za.ac.cput.domain.Blog;

import java.util.List;

public interface IBlogService extends IService<Blog, Long> {
    void delete(Long id);

    List<Blog> getAll();

    Blog getById(Long blogId);
    // This interface extends IService, which provides basic CRUD operations for the Blog entity.
    // You can add additional methods specific to Blog service here if needed.
}
