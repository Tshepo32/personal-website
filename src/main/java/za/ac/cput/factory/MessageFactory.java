package za.ac.cput.factory;

import za.ac.cput.domain.Message;

public class MessageFactory {
    public static Message createMessage(String fullName, String subject, String content) {
        if (fullName == null || fullName.isEmpty()) {
            throw new IllegalArgumentException("Full name cannot be null or empty");
        }
        if (subject == null || subject.isEmpty()) {
            throw new IllegalArgumentException("Subject cannot be null or empty");
        }
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }

        return new Message.Builder()
                .fullName(fullName)
                .subject(subject)
                .content(content)
                .build();
    }
}
