package za.ac.cput.service;

import za.ac.cput.domain.Message;

import java.util.List;

public interface IMessageService extends IService<Message, Long> {
    void delete(Long id);

    List<Message> getAll();
    // Additional methods specific to Message can be defined here
}
