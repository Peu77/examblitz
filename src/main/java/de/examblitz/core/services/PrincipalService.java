package de.examblitz.core.services;

import de.examblitz.core.utils.UserPrincipal;
import de.examblitz.core.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class PrincipalService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserPrincipal loadUserByUsername(String username) throws BadCredentialsException {
        var user = userRepository.getUserByName(username);

        if (user == null) throw new BadCredentialsException("");

        return new UserPrincipal(user);
    }
}
