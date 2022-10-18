package de.examblitz.core.utils;


import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {

    /**
     * This specifies for how long a token is valid.
     */
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    /**
     * This is for validating, and encrypting a JWT-Token.
     */
    @Value("${jwt.secret}")
    private String secret;

    /**
     * This returns one property from a token
     * @param token The token, we want the information from
     * @param resolver The data we want
     * @return The claim's value
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> resolver) {
        final Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

        return resolver.apply(claims);
    }

    /**
     * This method creates a new token
     *
     * @param claims All the data, one token should have
     * @param subject The subject represented by the token (normally the user's name)
     * @return A valid JWT-Token
     */
    public String generateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    /**
     * This checks whether the provided token has been created with the secret key of this
     * Application.
     *
     * @param token The token we need to check
     * @param details This confirms that the token was mode for a specific person
     * @return If the token is valid.
     */
    public Boolean validateToken(String token, UserDetails details) {
        final String username = getClaimFromToken(token, Claims::getSubject);
        final Boolean expired = getClaimFromToken(token, Claims::getExpiration).before(new Date());

        return (username.equals(details.getUsername()) && !expired);
    }
}
