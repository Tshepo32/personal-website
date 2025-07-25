package za.ac.cput.controller;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value; // Import for @Value
import org.springframework.web.reactive.function.client.WebClient; // Import WebClient
import reactor.core.publisher.Mono; // Import Mono for reactive types
import za.ac.cput.dto.ChatRequest;

import java.util.*;
import java.time.Duration;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://tshepo32.github.io")
public class ChatController {

    private final Map<List<String>, String> personalFacts = new HashMap<>();
    private final WebClient webClient; // Declare WebClient

    // Inject Python service URL from application.properties
    @Value("${python.chatbot.url}")
    private String pythonChatbotUrl;

    // Constructor to initialize personalFacts and WebClient
    public ChatController(WebClient.Builder webClientBuilder) {
        // Initialize personalFacts (your existing map)
        personalFacts.put(Arrays.asList("name", "who are you", "your name"), "My name is Lorens. Nice to meet you.");
        personalFacts.put(Arrays.asList("age", "how old are you"), "I'm a program, programmed this year, so that makes me less than a year old.");
        personalFacts.put(Arrays.asList("profession", "job", "what do you do", "work"), "I am a Fullstack developer, specializing in Java. [cite: 6]");
        personalFacts.put(Arrays.asList("location", "where are you based", "live"), "I am currently based in Cape Town, Western Cape, South Africa.");
        personalFacts.put(Arrays.asList("education", "studied", "where did you study"), "I did my diploma in ICT: Applications Development at Cape Peninsula University of Technology. [cite: 26]");
        personalFacts.put(Arrays.asList("skills", "tech stack", "technologies", "know"), "I have strong skills in Java, C, Python, Data structures, Algorithms and more. [cite: 16]");
        personalFacts.put(Arrays.asList("experience", "work history", "worked at"), "I'm currently an in-service trainee at Condorgreen. [cite: 40]");
        personalFacts.put(Arrays.asList("hobbies", "interests", "free time"), "In my free time, I enjoy comedy sitcoms, I love to read biographical books, and I love old school music.");
        personalFacts.put(Arrays.asList("passion", "motivated by"), "I'm passionate about Coding and constantly learning and practicing. [cite: 9]");
        personalFacts.put(Arrays.asList("contact", "email", "get in touch"), "You can reach me directly on WhatsApp at 0717596096 or email at tlorens7@gmail.com. [cite: 2, 3]");
        personalFacts.put(Arrays.asList("linkedin", "social media", "connect"), "You can connect with me on LinkedIn: www.linkedin.com/in/lorens-tshepo-maleo-2533b04a. [cite: 3]");
        personalFacts.put(Arrays.asList("hello", "hi", "hey"), "Hello there! How can I help you today?");
        personalFacts.put(Arrays.asList("how are you", "you doing"), "I'm just a program, but I'm doing great! Thanks for asking.");
        personalFacts.put(Arrays.asList("thank you", "thanks", "cheers"), "You're very welcome! Anything else you'd like to know?");
        personalFacts.put(Arrays.asList("bye", "goodbye", "see ya"), "Goodbye! Feel free to come back with more questions.");
        personalFacts.put(Arrays.asList("favourite food", "favorite meal"), "Just include meat and we good to go.");
        personalFacts.put(Arrays.asList("dream job", "ideal career"), "My dream job is senior developer, but I don't intend on working till 60 years old.");

        // Initialize WebClient with a base URL if applicable, or directly here
        this.webClient = webClientBuilder
                .baseUrl("http://localhost:5000") // Default to localhost:5000 for local Python service
                .build();
    }

    @PostMapping("/ask")
    public Mono<ResponseEntity<Map<String, String>>> askAboutMe(@RequestBody ChatRequest request) {
        String question = request.getQuestion();
        String lowerCaseQuestion = question.toLowerCase();

        // 1. Try to answer with pre-programmed personal facts first
        for (Map.Entry<List<String>, String> entry : personalFacts.entrySet()) {
            for (String keyword : entry.getKey()) {
                if (lowerCaseQuestion.contains(keyword)) {
                    Map<String, String> response = new HashMap<>();
                    response.put("answer", entry.getValue());
                    return Mono.just(ResponseEntity.ok(response));
                }
            }
        }

        // 2. If no pre-programmed fact matches, forward to Python service
        return webClient.post()
                .uri(pythonChatbotUrl + "/ask_from_resume") // Use injected URL from properties
                .bodyValue(Collections.singletonMap("question", question))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, String>>() {})
                .map(ResponseEntity::ok)
                .timeout(Duration.ofSeconds(10)) // Add a timeout for the Python service call
                .onErrorResume(e -> {
                    // Log the error for debugging
                    System.err.println("Error calling Python chatbot service: " + e.getMessage());
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("answer", "I'm having a little trouble accessing my resume at the moment. Could you try asking in a different way or about a general topic?");
                    return Mono.just(ResponseEntity.status(500).body(errorResponse));
                });
    }
}