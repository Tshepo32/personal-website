package za.ac.cput.util;

public class Helper {

    //Generate a unique ID
    public static String generateId() {
        return java.util.UUID.randomUUID().toString();
    }

    //Check if a string is null or empty
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    //Check if a string is a valid email
    public static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email != null && email.matches(emailRegex);
    }

    //Check if a string is a valid phone number
    public static boolean isValidPhoneNumber(String phoneNumber) {
        String phoneRegex = "^\\d{10}$";
        return phoneNumber != null && phoneNumber.matches(phoneRegex);
    }

    //Check if a date is not in the past
    public static boolean isValidDate(java.time.LocalDate date) {
        return date != null && !date.isBefore(java.time.LocalDate.now());
    }

    //Check if an object is not null
    public static boolean isValidObject(Object obj) {
        return obj != null;
    }


}
