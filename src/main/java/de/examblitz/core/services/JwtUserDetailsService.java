package de.examblitz.core.services;

import de.examblitz.core.utils.UserPrincipal;
import de.examblitz.core.dto.AuthorizeUserDto;
import de.examblitz.core.model.UserModel;
import de.examblitz.core.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@AllArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserPrincipal save(AuthorizeUserDto authenticationRequest) {
        UserModel userModel = new UserModel();
        String hashedPassword = BCrypt.hashpw(authenticationRequest.password(), BCrypt.gensalt());

        userModel.setName(authenticationRequest.name());
        userModel.setPassword(hashedPassword);
        userModel.setAuthorities(Arrays.asList("ROLE_USER"));
        userModel.setPasswordSalt(BCrypt.gensalt());

        userRepository.save(userModel);

        return new UserPrincipal(userModel);
    }

    @Override
    public UserPrincipal loadUserByUsername(String username) throws BadCredentialsException {
        var user = userRepository.getUsersByName(username);

        if (user == null) throw new BadCredentialsException("");

        return new UserPrincipal(user);
    }
}
