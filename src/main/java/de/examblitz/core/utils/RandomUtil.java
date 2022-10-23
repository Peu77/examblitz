package de.examblitz.core.utils;

public class RandomUtil {

    /**
     * This generates a random float in a specific range.
     *
     * @param min The generated number won't go below this.
     * @param max The generated number won't go above this.
     * @return A random float.
     */
    public static float generateRandomFloat(float min, float max) {
        return (float) ((Math.random() * (max - min)) + min);
    }

    /**
     * This generates a random int in a specific range.
     *
     * @param min The generated number won't go below this.
     * @param max The generated number won't go above this.
     * @return A random int.
     */
    public static int generateRandomInt(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }


    /**
     * Generates a random {@link String} with a specific length
     *
     * @param length The length of the {@link String} to be generated.
     * @return A random {@link String}
     */
    public static String generateRandomString(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < length; i++)
            result.append(chars.charAt(generateRandomInt(0, chars.length())));

        return result.toString();
    }

}
