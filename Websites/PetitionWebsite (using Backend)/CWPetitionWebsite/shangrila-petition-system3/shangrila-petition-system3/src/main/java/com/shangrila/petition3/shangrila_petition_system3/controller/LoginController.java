package com.shangrila.petition3.shangrila_petition_system3.controller;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;
import com.shangrila.petition3.shangrila_petition_system3.service.PetitionerService;

@Controller
@RequestMapping(value = {"/petitioners"})
public class LoginController {

	
	  @Autowired 
	  private PetitionerService petitionerService;
	  
	  @RequestMapping(value = "/login") 
	  public ModelAndView showLoginForm() {
	  return new ModelAndView("login"); // Show login form }
	  }
	  
	  @RequestMapping(value = "/saved", method = RequestMethod.POST) 
	  public ModelAndView login(@RequestParam("username") String
	  email, @RequestParam("password") String password, Model model,
	  RedirectAttributes redirectAttributes) {
		  try { Petitioner petitioner =
	  petitionerService.authenticatePetitioner(email, password); 
		  redirectAttributes.addFlashAttribute("message",
	  "Login successful!"); return new ModelAndView("redirect:/dashboard/create");
	  } catch (Exception e) { model.addAttribute("error",
	  "Invalid email or password."); return new ModelAndView("login"); } }
	 
}

