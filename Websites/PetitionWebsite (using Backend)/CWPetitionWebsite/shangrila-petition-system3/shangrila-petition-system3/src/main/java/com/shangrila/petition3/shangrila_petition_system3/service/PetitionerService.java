package com.shangrila.petition3.shangrila_petition_system3.service;

import org.springframework.beans.factory.annotation.Autowired; 
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;
import com.shangrila.petition3.shangrila_petition_system3.repository.PetitionerRepository;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

@Service
public class PetitionerService {

	 
	    

	  
	  @Autowired
	  private PetitionerRepository petitionerRepository;
	 

	
	
	  public void save(Petitioner petitioner){
		  String encodedPassword = encodePasswordSHA256(petitioner.getPassword());
				  petitioner.setPassword(encodedPassword);
				  petitionerRepository.save(petitioner);  }
	  
	  
				/*
				 * public void registerPetitioner(Petitioner petitioner) { // Validate BioID if
				 * (petitionerRepository.existsByEmail(petitioner.getEmail())) { throw new
				 * RuntimeException("Email is already registered."); } if
				 * (petitionerRepository.existsByBioId(petitioner.getBioId())) { throw new
				 * RuntimeException("BioID is already in use."); }
				 * petitioner.setPassword(encodePasswordSHA256(petitioner.getPassword()));
				 * 
				 * petitionerRepository.save(petitioner); }
				 */
	  
	  public Petitioner findByEmail(String email) { return
	  petitionerRepository.findByEmail(email); // Fetch the petitioner by email
	  }
	  
	  
	  
	  
	  //dddddd is password for giveno246 //register password for man@yahoo public
	  public Petitioner authenticatePetitioner(String email, String password) {
		  Petitioner petitioner = petitionerRepository.findByEmail(email);
		  if (petitioner == null)
	  { 
			  throw new RuntimeException("Invalid email or password."); 
			  }
	  if (!petitioner.getPassword().equals(encodePasswordSHA256(password))) 
	  { 
		  throw new RuntimeException("Invalid email or password.");
		  }
	  
	  return petitioner; // Successful authentication
	  
	  
	  } private String encodePasswordSHA256(String password) { try { MessageDigest
	  digest = MessageDigest.getInstance("SHA-256"); byte[] encodedHash =
	  digest.digest(password.getBytes(StandardCharsets.UTF_8)); return
	  bytesToHex(encodedHash); } catch (NoSuchAlgorithmException e) { throw new
	  RuntimeException("Error encoding password", e); } }
	  
private String bytesToHex(byte[] hash) { 
	StringBuilder hexString = new StringBuilder(); 
	for (byte b : hash) { 
		String hex = Integer.toHexString(0xff
	  & b); 
		if (hex.length() == 1) {
			hexString.append('0'); }
	  hexString.append(hex); 
	  } return hexString.toString(); 
	  
	  }
}


	 

