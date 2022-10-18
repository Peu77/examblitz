package de.examblitz.core.utils;

import de.examblitz.core.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * This is wrapping a database-user for the satisfaction of Spring.
 */
@AllArgsConstructor
@Getter
public class UserPrincipal implements UserDetails {

    /**
     * The user we're wrapping
     */
    private UserModel userModel;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return userModel.getAuthorities().stream().map(role -> (GrantedAuthority) () -> role).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return userModel.getPassword();
    }

    @Override
    public String getUsername() {
        return userModel.getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
