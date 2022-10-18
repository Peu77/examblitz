package de.examblitz.core.controller;

import de.examblitz.core.utils.UserPrincipal;
import de.examblitz.core.dto.AuthorizeUserDto;
import de.examblitz.core.dto.TokenResponse;
import de.examblitz.core.utils.JwtTokenUtil;
import de.examblitz.core.services.JwtUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin
@AllArgsConstructor
public class JwtAuthController {
    private AuthenticationManager authenticationManager;

    private JwtTokenUtil jwtTokenUtil;

    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody AuthorizeUserDto authenticationRequest) {
        return ResponseEntity.ok(userDetailsService.save(authenticationRequest));
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthorizeUserDto authenticationRequest) {
        try {
            // This is adding all necessary information to the current context.
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.name(), authenticationRequest.password()));

        } catch (Exception exception) {
            return ResponseEntity.badRequest().build();
        }

        // This converts a
        final UserPrincipal principal = userDetailsService
                .loadUserByUsername(authenticationRequest.name());

        // Finally, were generating a token, for the user who verified their identity
        final String token = jwtTokenUtil.generateToken(new HashMap(), principal.getUsername());

        return ResponseEntity.ok(new TokenResponse(token));
    }
}
