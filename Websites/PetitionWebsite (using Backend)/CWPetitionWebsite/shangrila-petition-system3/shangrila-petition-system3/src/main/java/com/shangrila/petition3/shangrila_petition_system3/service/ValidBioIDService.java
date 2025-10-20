package com.shangrila.petition3.shangrila_petition_system3.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shangrila.petition3.shangrila_petition_system3.domain.BioID;
import com.shangrila.petition3.shangrila_petition_system3.repository.BioIDRepository;

/*import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;*/

@Service
public class ValidBioIDService {


	    private final BioIDRepository bioIDRepository;

	    @Autowired
	    public ValidBioIDService(BioIDRepository bioIDRepository) {
	        this.bioIDRepository = bioIDRepository;
	    }

	    // Check if BioID exists and is unused
	    public boolean isValidAndUnused(String bioID) {
	        BioID bio = bioIDRepository.findById(bioID).orElse(null);
	        return bio != null && !bio.isUsed();
	    }

	    // Mark BioID as used
	    public void markAsUsed(String bioID) {
	        BioID bio = bioIDRepository.findById(bioID).orElseThrow(() -> new IllegalArgumentException("Invalid BioID"));
	        bio.setUsed(true);
	        bioIDRepository.save(bio);
	    }
	
}
