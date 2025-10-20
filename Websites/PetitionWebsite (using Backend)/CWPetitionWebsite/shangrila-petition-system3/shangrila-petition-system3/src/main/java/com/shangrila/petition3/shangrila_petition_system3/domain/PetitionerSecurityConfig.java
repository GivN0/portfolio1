package com.shangrila.petition3.shangrila_petition_system3.domain;
/*
 * import org.springframework.context.annotation.Bean; import
 * org.springframework.context.annotation.Configuration; import
 * org.springframework.context.annotation.Primary; import
 * org.springframework.security.authentication.AuthenticationManager; import
 * org.springframework.security.config.annotation.authentication.configuration.
 * AuthenticationConfiguration; import
 * org.springframework.security.config.annotation.web.builders.HttpSecurity;
 * import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
 * import org.springframework.security.crypto.password.PasswordEncoder; import
 * org.springframework.security.web.SecurityFilterChain;
 * 
 * 
 * @Configuration public class PetitionerSecurityConfig {
 * 
 * @Bean public SecurityFilterChain petitionerSecurityFilterChain(HttpSecurity
 * http) throws Exception { http .securityMatcher("/petitioner/**") // Scope to
 * petitioner URLs .authorizeHttpRequests(authorize -> authorize
 * .requestMatchers("/petitioner/login", "/petitioner/register").permitAll() //
 * Allow login and register .requestMatchers("/petitioner/petitions",
 * "/petitioner/petitions/**").hasRole("PETITIONER") // Restrict access to
 * petitioners .anyRequest().authenticated() // All other requests require
 * authentication ) .formLogin(form -> form .loginPage("/petitioner/login") //
 * Custom login page .defaultSuccessUrl("/petitioner/petitions", true) //
 * Redirect to dashboard .permitAll() ) .logout(logout -> logout
 * .logoutUrl("/petitioner/logout") .logoutSuccessUrl("/") // Redirect to home
 * page after logout .permitAll() );
 * 
 * return http.build(); }
 * 
 * @Bean
 * 
 * @Primary public AuthenticationManager petitionerAuthenticationManager(
 * AuthenticationConfiguration authenticationConfiguration) throws Exception {
 * return authenticationConfiguration.getAuthenticationManager(); }
 * 
 * @Bean public PasswordEncoder petitionerPasswordEncoder() { return new
 * BCryptPasswordEncoder(); // Password encoder using BCrypt } }
 * 
 */