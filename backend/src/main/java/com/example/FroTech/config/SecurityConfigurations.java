package com.example.FroTech.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize

                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()

                        .requestMatchers(HttpMethod.PUT, "/usuario/definir-senha").permitAll()

                        .requestMatchers(HttpMethod.POST, "/auth/registrar").hasAuthority("ROLE_ADMIN")

                        .requestMatchers("/usuario/**").hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.GET, "/veiculos/**").hasAnyAuthority("ROLE_MOTORISTA")
                        .requestMatchers(HttpMethod.PUT,"/veiculos/**/devolver").hasAuthority("ROLE_MOTORISTA")

                        .requestMatchers("/veiculos/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/manutencoes/**").hasAuthority("ROLE_ADMIN")

                        .requestMatchers("/abastecimentos/**").hasAuthority("ROLE_MOTORISTA")
                        .requestMatchers("/checklists").hasAuthority("ROLE_MOTORISTA")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
