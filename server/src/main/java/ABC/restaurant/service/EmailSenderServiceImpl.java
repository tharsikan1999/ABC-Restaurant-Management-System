
package ABC.restaurant.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {


    private final JavaMailSender mailSender;

    public EmailSenderServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(String name, String to, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        String customizedMessage = "Dear " + name + ",\n\n" + message + "\n\nBest regards,\nABC Restaurant";

        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(customizedMessage);

        this.mailSender.send(simpleMailMessage);
    }
}
