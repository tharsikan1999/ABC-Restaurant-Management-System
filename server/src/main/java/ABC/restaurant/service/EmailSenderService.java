package ABC.restaurant.service;


public interface EmailSenderService {
    void sendEmail(String name,String to, String subject, String message);
}
