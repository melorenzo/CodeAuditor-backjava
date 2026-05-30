package com.auditoria.config;

import com.auditoria.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Log para saber que el filtro se ejecuta
        System.out.println(">>> JwtRequestFilter: " + request.getMethod() + " " + request.getRequestURI());

        final String authorizationHeader = request.getHeader("Authorization");
        System.out.println(">>> Authorization header: " + authorizationHeader);

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            System.out.println(
                    ">>> Extracted JWT (first 20 chars): " + (jwt.length() > 20 ? jwt.substring(0, 20) + "..." : jwt));
            try {
                username = jwtUtil.extractUsername(jwt);
                System.out.println(">>> Extracted username: " + username);
            } catch (Exception e) {
                System.out.println(">>> Error extracting username: " + e.getMessage());
            }
        } else {
            System.out.println(">>> No Bearer token found");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            System.out.println(">>> Trying to load UserDetails for: " + username);
            try {
                UserDetails userDetails = this.userService.loadUserByUsername(username);
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println(">>> Authentication set for user: " + username);
                } else {
                    System.out.println(">>> Token validation failed (invalid or expired)");
                }
            } catch (Exception e) {
                System.out.println(">>> Exception loading user: " + e.getMessage());
            }
        } else if (username == null) {
            System.out.println(">>> Username is null, no authentication set");
        } else {
            System.out.println(">>> Authentication already present in context");
        }

        chain.doFilter(request, response);
    }
}