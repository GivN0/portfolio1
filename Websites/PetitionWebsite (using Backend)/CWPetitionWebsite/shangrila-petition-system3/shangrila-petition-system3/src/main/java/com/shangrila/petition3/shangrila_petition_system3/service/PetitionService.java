package com.shangrila.petition3.shangrila_petition_system3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petition;
import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;
import com.shangrila.petition3.shangrila_petition_system3.repository.PetitionRepository;
import com.shangrila.petition3.shangrila_petition_system3.repository.PetitionerRepository;



@Service
public class PetitionService {

	
    private PetitionRepository petitionRepository;
    
    private Petitioner petitioner;

    @Autowired
    private PetitionerRepository petitionerRepository;

	@Autowired
    public PetitionService(PetitionRepository petitionRepository) {
        this.petitionRepository = petitionRepository;
    }

    public List<Petition> getAllPetitions() {
        return petitionRepository.findAll();
    }

    //@Transactional
    public void signPetition(Integer petitionId) {
        Petition petition = petitionRepository.findById(petitionId)
                .orElseThrow(() -> new RuntimeException("Petition not found"));

        String email = petitioner.getEmail();

        Petitioner petitioner = petitionerRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("Petitioner not found"));

        // Check if the petitioner has already signed
        if (petition.getSignatures().contains(petitioner)) {
            throw new IllegalStateException("Petitioner has already signed this petition");
        }

        // Add petitioner to petition's signatures set
        petition.getSignatures().add(petitioner);
        petition.setSignatureCount(petition.getSignatures().size()); // Update signature count

        petitionRepository.save(petition); // Persist changes
    }

	/*
	 * public void signPetition(Integer petitionId) { Optional<Petition> petitionOpt
	 * = petitionRepository.findById(petitionId); if (petitionOpt.isPresent()) {
	 * Petition petition = petitionOpt.get(); if
	 * ("open".equals(petition.getStatus())) { // Increment the signature count
	 * petition.setSignatureCount(petition.getSignatureCount() + 1);
	 * petitionRepository.save(petition); // Save the updated petition } else {
	 * throw new IllegalStateException("Cannot sign a closed petition."); } } else {
	 * throw new IllegalArgumentException("Petition not found."); } }
	 */
    public void createPetition(Petition petition) {
        petitionRepository.save(petition);
    }
    
    // Get all closed petitions
    public List<Petition> getAllClosedPetitions() {
        return petitionRepository.findByStatus("closed");
    }
    public List<Petition> getAllOpenPetitions() {
        return petitionRepository.findByStatus("open");
    }
 
}

