package de.examblitz.core.auth;

import de.examblitz.core.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetails save(JwtRequest authenticationRequest) {
        de.examblitz.core.model.User user = new de.examblitz.core.model.User();
        String hashedPassword = BCrypt.hashpw(authenticationRequest.getPassword(), BCrypt.gensalt());

        user.setName(authenticationRequest.getUsername());
        user.setPassword(hashedPassword);
        user.setAuthorities(Arrays.asList("ROLE_USER"));
        user.setPasswordSalt(BCrypt.gensalt());

        userRepository.save(user);
        return new User(user.getName(), user.getPassword(), getAuthorities(user.getAuthorities()));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.getUsersByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        return new User(user.getName(), user.getPassword(), getAuthorities(user.getAuthorities()));
    }

    private Collection<GrantedAuthority> getAuthorities(Collection<String> roles) {
        return roles.stream().map(role -> (GrantedAuthority) () -> role).collect(Collectors.toList());
    }
}
