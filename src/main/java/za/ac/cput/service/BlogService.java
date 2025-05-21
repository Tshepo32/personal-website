package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Blog;
import za.ac.cput.repository.BlogRepository;

import java.util.List;

@Service
public class BlogService implements IBlogService {

    private final BlogRepository blogRepository;
    @Autowired
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @Override
    public Blog create(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public Blog read(Long id) {
        return blogRepository.findById(id).orElse(null);
    }

    @Override
    public Blog update(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public Blog delete(Blog blog) {
        blogRepository.delete(blog);
        return blog;
    }

    @Override
    public void delete(Long id) {
        blogRepository.deleteById(id);
    }

    @Override
    public List<Blog> getAll() {
        return blogRepository.findAll();
    }

    @Override
    public Blog getById(Long blogId) {
        return blogRepository.findById(blogId).orElse(null);
    }
}
