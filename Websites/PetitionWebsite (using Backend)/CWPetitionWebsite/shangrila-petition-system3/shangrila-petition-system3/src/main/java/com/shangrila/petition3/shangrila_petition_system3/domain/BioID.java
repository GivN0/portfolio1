package com.shangrila.petition3.shangrila_petition_system3.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="bioid", schema="petition")
public class BioID {
    @Id
    @Column(name="code", nullable=false, length=10)
    private String code;
    public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public boolean isUsed() {
		return used;
	}
	public void setUsed(boolean used) {
		this.used = used;
	}
	@Column(name="used")
	private boolean used;
}
