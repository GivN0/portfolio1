package com.shangrila.petition3.shangrila_petition_system3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shangrila.petition3.shangrila_petition_system3.domain.Admin;
import com.shangrila.petition3.shangrila_petition_system3.domain.Petition;
import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;
import com.shangrila.petition3.shangrila_petition_system3.domain.SHA256Encoder;
import com.shangrila.petition3.shangrila_petition_system3.repository.AdminRepository;
import com.shangrila.petition3.shangrila_petition_system3.repository.PetitionRepository;
import com.shangrila.petition3.shangrila_petition_system3.repository.PetitionerRepository;



/*
 * @Service public class AdminService {
 * 
 * @Autowired private AdminRepository adminRepository;
 * 
 * @Autowired private Petitioner petitioner;
 * 
 * private SHA256Encoder passwordEncoder;
 * 
 * @Autowired private PetitionRepository petitionRepository;
 * 
 * @Autowired private PetitionerRepository petitionerRepository;
 * 
 * 
 * 
 * public Admin getAdminByEmail(String email) { Admin admin =
 * adminRepository.findByEmail(email); if (admin == null) { throw new
 * RuntimeException("Admin not found"); } return admin; }
 * 
 * public void save(Admin admin){ String encodedPassword =
 * passwordEncoder.encodePassword(admin.getPassword());
 * petitioner.setPassword(encodedPassword);
 * petitionerRepository.save(petitioner); }
 * 
 * 
 * 
 * public List<Petition> getAllPetitions() { return
 * petitionRepository.findAll(); } }
 */

	

	
	/*
    @Autowired
    private PetitionRepository petitionRepository;

    public List<Petition> getAllPetitions() {
        return petitionRepository.findAll();
    }

    public void setSignatureThreshold(int threshold) {
        // Store threshold in a configuration table or in-memory variable
    }

    public void respondToPetition(Long petitionId, String response) {
        Petition petition = petitionRepository.findById(petitionId)
            .orElseThrow(() -> new RuntimeException("Petition not found"));

        if (!petition.isClosed()) {
            petition.setResponse(response);
            petition.setClosed(true);
            petitionRepository.save(petition);
        } else {
            throw new RuntimeException("Petition is already closed.");
        }
    }
}
*/