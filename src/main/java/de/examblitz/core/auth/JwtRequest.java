package de.examblitz.core.auth;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 5926468583005150707L;

    public JwtRequest() {
    }

    private String username;
    private String password;
}
