package de.examblitz.core.auth;

import de.examblitz.core.services.PrincipalService;
import de.examblitz.core.utils.JwtTokenUtil;
import de.examblitz.core.utils.UserPrincipal;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Component
@AllArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private JwtTokenUtil jwtTokenUtil;
    private PrincipalService principalService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var cookies = request.getCookies();

        if (cookies == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // The cookie that holds the value of the token required to authenticate and
        // authorize
        var tokenCookie = Arrays.stream(cookies).filter(cookie ->
                                                                cookie.getName().equals(JwtTokenUtil.COOKIE_NAME)).findFirst();

        if (tokenCookie.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        var jwtToken = tokenCookie.get().getValue();

        try {
            var username = jwtTokenUtil.getClaimFromToken(jwtToken, Claims::getSubject);

            UserPrincipal principal = this.principalService.loadUserByUsername(username);

            // Return, if the token isn't a valid one.
            if (!jwtTokenUtil.validateToken(jwtToken, principal)) {
                filterChain.doFilter(request, response);
                return;
            }

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (Exception ignored) {
        }

        filterChain.doFilter(request, response);
    }
}
