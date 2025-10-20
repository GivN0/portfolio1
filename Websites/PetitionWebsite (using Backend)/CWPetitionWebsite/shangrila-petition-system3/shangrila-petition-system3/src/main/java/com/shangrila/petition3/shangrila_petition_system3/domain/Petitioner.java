package com.shangrila.petition3.shangrila_petition_system3.domain;

import java.time.LocalDate; 
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
/*import jakarta.validation.constraints.NotBlank;
*/import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
/*import jakarta.validation.constraints.Size;
*/import jakarta.persistence.*;


//import org.springframework.lang.NonNull;

@Entity
@Table(name = "petitioners", schema="petition")
public class Petitioner {

	    @Id
	    @Column(name = "petitioner_email", nullable=false, length=100)
	    @Email
	    private String email;
	    
	    
	   

	    @Column(name = "petitioner_name", length=100)
	    private String fullName;

	    @Past
	    @Column(name = "dob")
	    private LocalDate dateOfBirth;


	    
	    @Column(name = "password_hash")
	    
	    private String password;

	    @Column(name = "bioid", length=45)
	    private String bioId;
	    
	    @Column(name="role", nullable=false)
	    private String role="PETITIONER";
	    
	   
		/*
		 * @Column(name="role")
		 * 
		 * @NotNull
		 * 
		 * @NotEmpty private String role; // "ADMIN" or "PETITIONER"
		 */
	    
	    
	 public String getRole() {
			return role;
		}

		public void setRole(String role) {
			this.role = role;
		}

		// Getters and Setters
	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public String getFullName() {
	        return fullName;
	    }

	    public void setFullName(String fullName) {
	        this.fullName = fullName;
	    }

	    public LocalDate getDateOfBirth() {
	        return dateOfBirth;
	    }

	    public void setDateOfBirth(LocalDate dateOfBirth) {
	        this.dateOfBirth = dateOfBirth;
	    }

	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    public String getBioId() {
	        return bioId;
	    }

	    public void setBioId(String bioId) {
	        this.bioId = bioId;
	    }
	    
	   
	}
		/*
		 * @GeneratedValue(strategy = GenerationType.IDENTITY)
		 * 
		 * @Column(name = "id") private Integer id;
		 */


    
		/*
		 * @Id private String email;
		 * 
		 * private String fullName;
		 * 
		 * 
		 * 
		 * private LocalDate dateOfBirth;
		 * 
		 * 
		 * private String password;
		 * 
		 * 
		 * private String bioId;
		 * 
		 * 
		 * //public Integer getId() { return id; }
		 * 
		 * //public void setId(Integer id) { this.id = id; }
		 * 
		 * 
		 * 
		 * @Column(name = "petitioner_email", nullable=false, length=100) public String
		 * getEmail() { return email; }
		 * 
		 * @Email public void setEmail(String email) { this.email = email; }
		 * 
		 * @Column(name = "petitioner_name", length=100) public String getFullName() {
		 * return fullName; }
		 * 
		 * public void setFullName(String fullName) { this.fullName = fullName; }
		 * 
		 * @Past
		 * 
		 * @Column(name = "dob") public LocalDate getDateOfBirth() { return dateOfBirth;
		 * }
		 * 
		 * 
		 * public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth =
		 * dateOfBirth; }
		 * 
		 * @Column(name = "password_hash") public String getPassword() { return
		 * password; }
		 * 
		 * public void setPassword(String password) { this.password = password; }
		 * 
		 * @Column(name = "bioid", length=45) public String getBioId() { return bioId; }
		 * 
		 * public void setBioId(String bioId) { this.bioId = bioId; }
		 */

	


