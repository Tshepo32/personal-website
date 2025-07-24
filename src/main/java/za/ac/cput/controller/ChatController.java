package za.ac.cput.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import za.ac.cput.dto.ChatRequest;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://tshepo32.github.io")
public class ChatController {

    private final Map<List<String>, String> personalFacts = new HashMap<>();

    public ChatController() {
        personalFacts.put(Arrays.asList("name", "who are you", "your name"), "My name is Lorens. Nice to meet you.");
        personalFacts.put(Arrays.asList("age", "how old are you"), "I'm a program, programmed this year, so that makes me less than a year old.");
        personalFacts.put(Arrays.asList("profession", "job", "what do you do", "work"), "I am a Fullstack developer, specializing in Java.");
        personalFacts.put(Arrays.asList("location", "where are you based", "live"), "I am currently based in Cape Town, Western Cape, South Africa.");
        personalFacts.put(Arrays.asList("education", "studied", "where did you study"), "I did my diploma in ICT: Applications Development at Cape Peninsula University of Technology.");
        personalFacts.put(Arrays.asList("skills", "tech stack", "technologies", "know"), "I have strong skills in Java, C, Python, Data structures, Algorithms and more.");
        personalFacts.put(Arrays.asList("experience", "work history", "worked at"), "I'm currently a frontend developer intern at Bos Technology.");
        personalFacts.put(Arrays.asList("hobbies", "interests", "free time"), "In my free time, I enjoy comedy sitcoms, I love to read biographical books, and I love old school music.");
        personalFacts.put(Arrays.asList("passion", "motivated by"), "I'm passionate about Coding and constantly learning and practicing.");
        personalFacts.put(Arrays.asList("contact", "email", "get in touch"), "You can reach me directly on WhatsApp at 0717596096.");
        personalFacts.put(Arrays.asList("linkedin", "social media", "connect"), "You can connect with me on LinkedIn: https://www.linkedin.com/in/lorens-tshepo-m-2533b04a/.");
        personalFacts.put(Arrays.asList("hello", "hi", "hey"), "Hello there! How can I help you today?");
        personalFacts.put(Arrays.asList("how are you", "you doing"), "I'm just a program, but I'm doing great! Thanks for asking.");
        personalFacts.put(Arrays.asList("thank you", "thanks", "cheers"), "You're very welcome! Anything else you'd like to know?");
        personalFacts.put(Arrays.asList("bye", "goodbye", "see ya"), "Goodbye! Feel free to come back with more questions.");
        personalFacts.put(Arrays.asList("favourite food", "favorite meal"), "Just include meat and we good to go.");
        personalFacts.put(Arrays.asList("dream job", "ideal career"), "My dream job is senior developer, but I don't intend on working till 60 years old.");
    }

    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> askAboutMe(@RequestBody ChatRequest request) {
        String question = request.getQuestion();
        String answer = generateAnswer(question);

        Map<String, String> response = new HashMap<>();
        response.put("answer", answer);

        return ResponseEntity.ok(response);
    }

    private String generateAnswer(String question) {
        String lowerCaseQuestion = question.toLowerCase();

        for (Map.Entry<List<String>, String> entry : personalFacts.entrySet()) {
            for (String keyword : entry.getKey()) {
                if (lowerCaseQuestion.contains(keyword)) {
                    return entry.getValue();
                }
            }
        }

        if (lowerCaseQuestion.contains("what is") || lowerCaseQuestion.contains("tell me about") || lowerCaseQuestion.contains("who is")) {
            return "I'm not sure I have information on that specific topic. Could you ask about my background, skills, or interests?";
        }

        return "That's an interesting question! I don't have a pre-programmed answer for that. Try asking about my hobbies, job, or education.";
    }
}
