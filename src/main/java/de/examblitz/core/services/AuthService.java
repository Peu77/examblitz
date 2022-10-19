package de.examblitz.core.services;

import de.examblitz.core.dto.AuthorizeUserDto;
import de.examblitz.core.model.UserModel;
import de.examblitz.core.repository.UserRepository;
import de.examblitz.core.utils.JwtTokenUtil;
import de.examblitz.core.utils.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    /**
     * This inserts a new user into the database.
     *
     * @param request Data needed to insert the entity
     * @return The created entity
     */
    public UserPrincipal createUser(AuthorizeUserDto request) {
        UserModel userModel = new UserModel();

        userModel.setName(request.name());
        userModel.setPassword(BCrypt.hashpw(request.password(), BCrypt.gensalt()));
        userModel.setAuthorities(List.of("ROLE_USER"));

        userRepository.save(userModel);

        return new UserPrincipal(userModel);
    }

    /**
     * This authorizes a user and generates a token
     * @param request The information provided
     * @param principal The user-principal, which contains the database-entry
     * @return Either the String or an empty Optional
     */
    public Optional<String> createUserToken(AuthorizeUserDto request, UserPrincipal principal) {
        try {
            // This is adding all necessary information to the current context.
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.name(), request.password()));

        } catch (Exception exception) {
            return Optional.empty();
        }

        // Finally, were generating a token, for the user who verified their identity
        return Optional.of(jwtTokenUtil.generateToken(new HashMap(), principal.getUsername()));
    }

    /**
     * Allows for access to the currently logged-in user(-model)
     * @return The User from the database
     */
    public UserModel getCurrentUser() {
        return ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserModel();
    }
}
