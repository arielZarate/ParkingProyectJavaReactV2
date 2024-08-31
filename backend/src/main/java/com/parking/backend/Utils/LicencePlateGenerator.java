package com.parking.backend.Utils;

import java.security.SecureRandom;

public class LicencePlateGenerator {

    private static final SecureRandom random = new SecureRandom();
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Método estático para generar una patente aleatoria
    public static String generateRandomLicencePlate() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }
        return  "BICYCLE-" +sb.toString().toUpperCase();
    }
}
