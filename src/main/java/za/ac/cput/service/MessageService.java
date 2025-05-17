package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Message;
import za.ac.cput.repository.MessageRepository;

import java.util.List;

@Service
public class MessageService implements IMessageService{

    private final MessageRepository messageRepository;
    @Autowired
    MessageService (MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public Message create(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message read(Long id) {
        return messageRepository.findById(id).orElse(null);
    }

    @Override
    public Message update(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message delete(Message message) {
        messageRepository.delete(message);
        return message;
    }

    @Override
    public void delete(Long id) {
        messageRepository.deleteById(id);
    }

    @Override
    public List<Message> getAll() {
        return messageRepository.findAll();
    }

}
