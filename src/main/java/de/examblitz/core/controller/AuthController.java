package de.examblitz.core.controller;

import de.examblitz.core.model.UserModel;
import de.examblitz.core.services.AuthService;
import de.examblitz.core.dto.AuthorizeUserDto;
import de.examblitz.core.dto.TokenResponse;
import de.examblitz.core.services.PrincipalService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private PrincipalService principalService;
    private AuthService authService;

    @RequestMapping(value = "/public/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody AuthorizeUserDto request) {
        return ResponseEntity.ok(authService.createUser(request));
    }

    @RequestMapping(value = "/public/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody AuthorizeUserDto request) {
        final var token = authService.createUserToken(request, principalService
                .loadUserByUsername(request.name()));

        if (token.isEmpty())
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(new TokenResponse(token.get()));
    }

    @RequestMapping("/me")
    public UserModel me() {
        return authService.getCurrentUser();
    }
}
