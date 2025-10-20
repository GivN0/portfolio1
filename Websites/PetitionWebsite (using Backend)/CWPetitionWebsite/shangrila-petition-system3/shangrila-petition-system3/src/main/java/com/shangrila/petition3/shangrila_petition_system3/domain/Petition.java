package com.shangrila.petition3.shangrila_petition_system3.domain;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.persistence.Column;

@Entity
@Table(name = "petitions", schema="petition")
public class Petition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="petition_id", nullable=false)
    private Integer id;
    
    @ManyToOne
    private Petitioner petitioner;  // Reference to Petitioner entity
    
    @ManyToMany
    @JoinTable(
        name = "petition_signatures",
        joinColumns = @JoinColumn(name = "petition_id"),
        inverseJoinColumns = @JoinColumn(name = "petitioner_email")
    )
    private Set<Petitioner> signatures = new HashSet<>();

    public Set<Petitioner> getSignatures() {
		return signatures;
	}

	public void setSignatures(Set<Petitioner> signatures) {
		this.signatures = signatures;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	 public Petitioner getPetitioner() {
	        return petitioner;
	    }

	    public void setPetitioner(Petitioner petitioner) {
	        this.petitioner = petitioner;
	    }

	/*
	 * public Petitioner getCreatedBy() { return createdBy; }
	 * 
	 * public void setCreatedBy(Petitioner createdBy) { this.createdBy = createdBy;
	 * }
	 * 
	 * public boolean isClosed() { return closed; }
	 * 
	 * public void setClosed(boolean closed) { this.closed = closed; }
	 */
	public int getSignatureCount() {
		return signatureCount;
	}

	public void setSignatureCount(int signatureCount) {
		this.signatureCount = signatureCount;
	}

	//@NotBlank
	@Column(name="title", length=100)
    private String title;

    //@NotBlank
	@Column(name="content", columnDefinition="longtext")
    private String content;

	/*
	 * @ManyToOne
	 * 
	 * @Column(name="createdBy") private Petitioner createdBy;
	 * 
	 * @Column(name="closed") private boolean closed = false;
	 */
	
	  @Column(nullable = false, length = 45, columnDefinition = "varchar(45) default 'open'")
	    private String status = "open"; // Default value
	  
	@Column(name="signature_count")
    private int signatureCount = 0;
    
    public String getResponse() {
		return response;
	}
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public void setResponse(String response) {
		this.response = response;
	}

	@Column(name="response", columnDefinition="longtext")
	private String response="";
	
	/*
	 * public int getSignatureThreshold() { return signatureThreshold; }
	 */

	/*
	 * public void setSignatureThreshold(int signatureThreshold) {
	 * this.signatureThreshold = signatureThreshold; }
	 */

	/*
	 * @Column(name="signatureThreshold") private int signatureThreshold = 1000;
	 */  // Default threshold


    // Getters and Setters
}
