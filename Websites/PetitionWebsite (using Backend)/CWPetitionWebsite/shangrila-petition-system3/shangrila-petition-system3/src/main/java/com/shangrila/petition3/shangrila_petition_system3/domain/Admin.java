package com.shangrila.petition3.shangrila_petition_system3.domain;



import jakarta.persistence.*;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;

//import org.springframework.data.annotation.Id;


@Entity
@Table(name = "admins", schema="petition")
public class Admin {
    @Id
    //@GeneratedValue
    @Column(name="admin_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	//@Email
    //@NotBlank
	@Column(name="email", nullable=false, length=100)
	@Email
    private String email;

    //@NotBlank
	@Column(name="password_hash", nullable=false)
    private String password;
	
	@Column(name="role")
	private String role="ADMIN";

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}


    // Getters and Setters
}


