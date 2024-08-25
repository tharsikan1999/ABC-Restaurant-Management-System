package ABC.restaurant.controller;

import ABC.restaurant.dto.ContactDto;
import ABC.restaurant.service.EmailSenderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    private final EmailSenderService emailSenderService;

    public EmailController(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody ContactDto emailMessage) {
        this.emailSenderService.sendEmail(
                emailMessage.getName(),
                emailMessage.getEmail(),
                emailMessage.getSubject(),
                emailMessage.getMessage()
        );
        return ResponseEntity.ok("Success");
    }
}
