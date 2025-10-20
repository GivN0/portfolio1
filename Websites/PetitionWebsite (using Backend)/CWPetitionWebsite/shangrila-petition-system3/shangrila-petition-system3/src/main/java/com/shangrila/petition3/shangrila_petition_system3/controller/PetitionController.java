package com.shangrila.petition3.shangrila_petition_system3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

//import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petition;
import com.shangrila.petition3.shangrila_petition_system3.service.PetitionService;


@Controller
@RequestMapping(value={"/dashboard"})
public class PetitionController {

	@Autowired
    private final PetitionService petitionService;

    public PetitionController(PetitionService petitionService) {
        this.petitionService = petitionService;
    }

    @GetMapping("/create")
    public ModelAndView showCreatePetitionForm(Model model) {
        model.addAttribute("petition", new Petition());
        return new ModelAndView("createPetition"); 
    }
    
    @GetMapping
    public ModelAndView viewDashboard(Model model) {
        List<Petition> petitions = petitionService.getAllPetitions();
        model.addAttribute("petitions", petitions);
        return new ModelAndView("dashboard");
    }
    
	/*
	 * @PostMapping("/sign/{id}") public ModelAndView signPetition(@PathVariable
	 * Long id) { petitionService.signPetition(id); return new
	 * ModelAndView("redirect:/dashboard"); }
	 */
    
    @PostMapping("/sign/{id}")
    public ModelAndView signPetition(@PathVariable Integer id) {
        try {
            petitionService.signPetition(id);  // Sign the petition
            return new ModelAndView("redirect:/dashboard");  // Redirect to the dashboard after signing
        } catch (IllegalStateException e) {
            return new ModelAndView("redirect:/dashboard?error=closed");  // Redirect with error message
        } catch (IllegalArgumentException e) {
            return new ModelAndView("redirect:/dashboard?error=notfound");  // Redirect with error message
        }
    }

    @PostMapping("/create")
    public ModelAndView createPetition(@Validated @ModelAttribute Petition petition, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return new ModelAndView("createPetition"); // Return to the form if there are errors
        }
        petitionService.createPetition(petition);
        return new ModelAndView("redirect:/dashboard"); 
    }

  
  
}
