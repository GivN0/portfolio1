package com.shangrila.petition3.shangrila_petition_system3.domain;

/*
 * import org.springframework.context.annotation.Bean; import
 * org.springframework.context.annotation.Configuration; import
 * org.springframework.context.annotation.Primary; import
 * org.springframework.security.authentication.AuthenticationManager; import
 * org.springframework.security.config.annotation.authentication.builders.
 * AuthenticationManagerBuilder; import
 * org.springframework.security.config.annotation.authentication.configuration.
 * AuthenticationConfiguration; import
 * org.springframework.security.config.annotation.web.builders.HttpSecurity;
 * import org.springframework.security.core.userdetails.User; import
 * org.springframework.security.core.userdetails.UserDetails; import
 * org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; import
 * org.springframework.security.crypto.password.PasswordEncoder; import
 * org.springframework.security.provisioning.InMemoryUserDetailsManager; import
 * org.springframework.security.web.SecurityFilterChain; import
 * org.springframework.beans.factory.annotation.Qualifier;
 * 
 * 
 * @Configuration public class SecurityConfig {
 * 
 * @Bean public PasswordEncoder passwordEncoder() { return new
 * BCryptPasswordEncoder(); // Global PasswordEncoder bean }
 * 
 * @Bean public SecurityFilterChain petitionSecurityFilterChain(HttpSecurity
 * http) throws Exception { http .authorizeRequests()
 * .requestMatchers("/petitioners/login", "/petitioners/register").permitAll()
 * // Allow public access to login and register
 * .requestMatchers("/admin/**").hasRole("ADMIN") // Admin routes are restricted
 * .anyRequest().authenticated() // All other requests require authentication
 * .and() .formLogin() .loginPage("/petitioners/login") // Custom login page
 * .defaultSuccessUrl("/petitioners/dashboard", true) // Redirect to
 * petitioner's dashboard .permitAll() .and() .logout() .logoutUrl("/logout")
 * .logoutSuccessUrl("/") // Redirect to home page after logout .permitAll();
 * 
 * return http.build(); }
 * 
 * @Bean public SecurityFilterChain adminSecurityFilterChain(HttpSecurity http)
 * throws Exception { http .securityMatcher("/admin/**") // Scope to admin URLs
 * .authorizeRequests(authorize -> authorize
 * .requestMatchers("/admin/**").hasRole("ADMIN") // Restrict admin routes
 * .anyRequest().denyAll() // Deny all other requests ) .formLogin(form -> form
 * .loginPage("/petitioners/login") // Custom login page
 * .defaultSuccessUrl("/admin/dashboard", true) // Redirect to admin dashboard
 * .permitAll() ) .logout(logout -> logout .logoutUrl("/logout")
 * .logoutSuccessUrl("/") // Redirect to home page after logout .permitAll() );
 * 
 * return http.build(); }
 * 
 * @Bean
 * 
 * @Primary public AuthenticationManager
 * authenticationManager(AuthenticationConfiguration
 * authenticationConfiguration) throws Exception { return
 * authenticationConfiguration.getAuthenticationManager(); // Global
 * AuthenticationManager bean }
 * 
 * @Bean public AuthenticationManager
 * adminAuthenticationManager(AuthenticationConfiguration
 * authenticationConfiguration) throws Exception { return
 * authenticationConfiguration.getAuthenticationManager(); // Admin
 * AuthenticationManager bean }
 * 
 * // Configure in-memory authentication for admin
 * 
 * @Bean public InMemoryUserDetailsManager
 * inMemoryUserDetailsManager(PasswordEncoder passwordEncoder) { UserDetails
 * admin = User.withUsername("admin@petition.parliament.sr")
 * .password(passwordEncoder.encode("2025%shangrila")) .roles("ADMIN") .build();
 * return new InMemoryUserDetailsManager(admin); } }
 * 
 * 
 * 
 * @Bean public SecurityFilterChain petitionSecurityFilterChain(HttpSecurity
 * http) throws Exception { http .authorizeRequests()
 * .requestMatchers("/petitioners/login", "/petitioners/register").permitAll()
 * // Allow public access to login and register
 * .requestMatchers("/admin/**").hasRole("ADMIN") // Admin routes are restricted
 * .anyRequest().authenticated() // All other requests require authentication
 * .and() .formLogin() .loginPage("/petitioners/login") // Custom login page
 * .defaultSuccessUrl("/petitioners/dashboard", true) // Redirect to
 * petitioner's dashboard .permitAll() .and() .logout() .logoutUrl("/logout")
 * .logoutSuccessUrl("/") // Redirect to home page after logout .permitAll();
 * 
 * return http.build(); }
 * 
 * @Bean public SecurityFilterChain adminSecurityFilterChain(HttpSecurity http,
 * 
 * @Qualifier("adminAuthenticationManager") AuthenticationManager
 * authenticationManager) throws Exception { http .securityMatcher("/admin/**")
 * // Scope to admin URLs .authorizeRequests(authorize -> authorize
 * .requestMatchers("/admin/**").hasRole("ADMIN") // Restrict admin routes
 * .anyRequest().denyAll() // Deny all other requests ) .formLogin(form -> form
 * .loginPage("/petitioners/login") // Custom login page
 * .defaultSuccessUrl("/admin/dashboard", true) // Redirect to admin dashboard
 * .permitAll() ) .logout(logout -> logout .logoutUrl("/logout")
 * .logoutSuccessUrl("/") // Redirect to home page after logout .permitAll() )
 * .authenticationManager(authenticationManager); // Inject admin
 * AuthenticationManager
 * 
 * return http.build(); }
 * 
 * @Bean public AuthenticationManager adminAuthenticationManager(
 * AuthenticationConfiguration authenticationConfiguration) throws Exception {
 * return authenticationConfiguration.getAuthenticationManager(); }
 * 
 * 
 * // Configure in-memory authentication for admin public void
 * adminSecurityConfigure(AuthenticationManagerBuilder auth, PasswordEncoder
 * passwordEncoder) throws Exception { auth.inMemoryAuthentication()
 * .withUser("admin@petition.parliament.sr")
 * .password(passwordEncoder.encode("2025%shangrila")) .roles("ADMIN"); } }
 */
