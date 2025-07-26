package za.ac.cput.pinger;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
public class PythonChatbotPinger implements CommandLineRunner {

    private final String CHATBOT_URL = "https://bott-2nq6.onrender.com";

    @Override
    public void run(String... args) throws Exception {
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

        // Schedule the ping task to run every 2 minutes
        scheduler.scheduleAtFixedRate(() -> {
            try {
                HttpClient client = HttpClient.newBuilder()
                        .connectTimeout(Duration.ofSeconds(10)) // Set a reasonable timeout
                        .build();

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(CHATBOT_URL))
                        .GET() // Send a GET request
                        .build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                // Log the response, but don't fail if it's not 200 (could be 404 for root, if no / endpoint)
                System.out.println("Ping to Python Chatbot Service (" + CHATBOT_URL + ") - Status: " + response.statusCode());

            } catch (Exception e) {
                System.err.println("Error pinging Python Chatbot Service: " + e.getMessage());
                // In a real application, you might want more sophisticated logging or alerting here
            }
        }, 0, 2, TimeUnit.MINUTES); // Initial delay 0, then every 2 minutes
    }
}
