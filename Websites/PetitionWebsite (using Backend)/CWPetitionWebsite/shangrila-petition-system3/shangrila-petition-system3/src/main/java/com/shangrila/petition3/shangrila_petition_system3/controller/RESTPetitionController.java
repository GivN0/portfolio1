package com.shangrila.petition3.shangrila_petition_system3.controller;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petition;
import com.shangrila.petition3.shangrila_petition_system3.service.PetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class RESTPetitionController {

	  @Autowired
	    private PetitionService petitionService;

	  @GetMapping("/slpp/petitions")
	    public PetitionResponse getAllPetitions(@RequestParam(required = false) String status) {
	        List<Petition> petitions;

	        if (status != null) {
	            if (status.equalsIgnoreCase("open")) {
	                petitions = petitionService.getAllOpenPetitions();
	            } else if (status.equalsIgnoreCase("closed")) {
	                petitions = petitionService.getAllClosedPetitions();
	            } else {
	                petitions = petitionService.getAllPetitions();
	            }
	        } else {
	            petitions = petitionService.getAllPetitions();
	        }

	        return new PetitionResponse(petitions);
	    }
	  
	  
	}

class PetitionResponse {
    private List<Petition> petitions;

    public PetitionResponse(List<Petition> petitions) {
        this.petitions = petitions;
    }

    public List<Petition> getPetitions() {
        return petitions;
    }

    public void setPetitions(List<Petition> petitions) {
        this.petitions = petitions;
    }
}
    
