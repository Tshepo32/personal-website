package za.ac.cput.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Arrays;
import java.util.AbstractMap.SimpleEntry; // For Map.entry in older Java versions if needed

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // IMPORTANT: Keep this for React dev server
public class ChatController {

    // --- YOUR PERSONAL KNOWLEDGE BASE ---
    // This Map stores keywords/phrases and corresponding answers.
    // You can expand this significantly with more facts about yourself.
    private final Map<List<String>, String> personalFacts = new HashMap<>();

    public ChatController() {
        // Initialize your personal facts here.
        // Use lowercase for keywords for easier matching.
        // Add as many facts as you want!

        // Basic Info
        personalFacts.put(Arrays.asList("name", "who are you", "your name"), "My name is Tshepo! Nice to meet you.");
        personalFacts.put(Arrays.asList("age", "how old are you"), "I am [Your Age] years old.");
        personalFacts.put(Arrays.asList("profession", "job", "what do you do", "work"), "I am a [Your Profession/Role], specializing in [Your Specialization, e.g., Full-Stack Development].");
        personalFacts.put(Arrays.asList("location", "where are you based", "live"), "I am currently based in Cape Town, Western Cape, South Africa.");
        personalFacts.put(Arrays.asList("education", "studied", "where did you study"), "I studied [Your Degree/Field] at [Your University Name].");

        // Skills & Experience
        personalFacts.put(Arrays.asList("skills", "tech stack", "technologies", "know"), "I have strong skills in [Skill 1, e.g., React], [Skill 2, e.g., Spring Boot], [Skill 3, e.g., SQL], and more!");
        personalFacts.put(Arrays.asList("experience", "work history", "worked at"), "I have professional experience in [Industry/Domain] and have worked on projects involving [Type of Projects].");

        // Hobbies & Interests
        personalFacts.put(Arrays.asList("hobbies", "interests", "free time"), "In my free time, I enjoy [Hobby 1, e.g., hiking], [Hobby 2, e.g., coding personal projects], and [Hobby 3, e.g., reading].");
        personalFacts.put(Arrays.asList("passion", "motivated by"), "I'm passionate about [Your Passion, e.g., building intuitive software solutions] and constantly learning new things.");

        // Contact Info
        personalFacts.put(Arrays.asList("contact", "email", "get in touch"), "You can reach me directly at [Your Email Address, e.g., tshepo@example.com].");
        personalFacts.put(Arrays.asList("linkedin", "social media", "connect"), "You can connect with me on LinkedIn: [Your LinkedIn Profile URL].");

        // General Greetings/Farewells
        personalFacts.put(Arrays.asList("hello", "hi", "hey"), "Hello there! How can I help you today?");
        personalFacts.put(Arrays.asList("how are you", "you doing"), "I'm just a program, but I'm doing great! Thanks for asking. How can I assist you?");
        personalFacts.put(Arrays.asList("thank you", "thanks", "cheers"), "You're very welcome! Is there anything else I can tell you about myself?");
        personalFacts.put(Arrays.asList("bye", "goodbye", "see ya"), "Goodbye! Feel free to ask if you have more questions later.");

        // More specific
        personalFacts.put(Arrays.asList("favourite food", "favorite meal"), "My favourite food is [Your Favourite Food].");
        personalFacts.put(Arrays.asList("dream job", "ideal career"), "My dream job would involve [Describe your ideal career].");
    }

    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> askAboutMe(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        String answer = generateAnswer(question); // Call the enhanced method

        Map<String, String> response = new HashMap<>();
        response.put("answer", answer);

        return ResponseEntity.ok(response);
    }

    private String generateAnswer(String question) {
        String lowerCaseQuestion = question.toLowerCase();

        // Try to find a direct match for the question's intent
        for (Map.Entry<List<String>, String> entry : personalFacts.entrySet()) {
            List<String> keywords = entry.getKey();
            String answer = entry.getValue();

            // Check if any of the keywords for this fact are in the user's question
            for (String keyword : keywords) {
                if (lowerCaseQuestion.contains(keyword)) {
                    return answer; // Return the first matching answer
                }
            }
        }

        // --- Fallback for questions that don't match known facts ---
        // This is where advanced logic or LLM integration would go.
        // For now, a polite generic response.
        if (lowerCaseQuestion.contains("what is") || lowerCaseQuestion.contains("tell me about") || lowerCaseQuestion.contains("who is")) {
            return "I'm not sure I have information on that specific topic. Could you ask about my background, skills, or interests?";
        }

        return "That's an interesting question! I don't have a pre-programmed answer for that. Could you ask something else about me, like my name, what I do, or my hobbies?";
    }
}
