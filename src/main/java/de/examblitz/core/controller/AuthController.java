package de.examblitz.core.controller;

import de.examblitz.core.model.UserModel;
import de.examblitz.core.services.AuthService;
import de.examblitz.core.dto.AuthorizeUserDto;
import de.examblitz.core.services.PrincipalService;
import de.examblitz.core.utils.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private PrincipalService principalService;
    private AuthService authService;

    @RequestMapping(value = "/public/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(HttpServletResponse response, @RequestBody AuthorizeUserDto request) {
        var userOptional = authService.createUser(request);

        // If the user already exists with the same name
        if (userOptional.isEmpty())
            return ResponseEntity.badRequest().build();

        var tokenOptional = authService.createUserToken(request, userOptional.get());

        // When the token could not be generated
        if (tokenOptional.isEmpty())
            return ResponseEntity.internalServerError().build();

        // Create the AUTH_TOKEN Cookie
        var cookie = new Cookie(JwtTokenUtil.COOKIE_NAME, tokenOptional.get());

        // Cookie Settings
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge((int) JwtTokenUtil.JWT_TOKEN_VALIDITY);
        cookie.setPath("/");

        // Add it to the response
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/public/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(HttpServletResponse response, @RequestBody AuthorizeUserDto request) {
        var token = authService.createUserToken(request, principalService
                .loadUserByUsername(request.name()));

        if (token.isEmpty())
            return ResponseEntity.badRequest().build();

        // Create the AUTH_TOKEN Cookie
        var cookie = new Cookie(JwtTokenUtil.COOKIE_NAME, token.get());

        // Cookie Settings
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge((int) JwtTokenUtil.JWT_TOKEN_VALIDITY);
        cookie.setPath("/");

        // Add it to the response
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @RequestMapping("/me")
    public UserModel me() {
        return authService.getCurrentUser();
    }
}
