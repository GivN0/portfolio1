package com.shangrila.petition3.shangrila_petition_system3.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;

//import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;
import com.shangrila.petition3.shangrila_petition_system3.service.PetitionerService;
import com.shangrila.petition3.shangrila_petition_system3.service.QRCodeService;
import com.shangrila.petition3.shangrila_petition_system3.service.ValidBioIDService;


@Controller
@RequestMapping(value = { "/petitioners"})
public class PetitionerController {

	private final PetitionerService petitionerService;
	/*
	 * private final QRCodeService qrCodeService; private ValidBioIDService
	 * validBioIDService;
	 */

	@Autowired
	public PetitionerController(PetitionerService petitionerService, QRCodeService qrCodeService,
			ValidBioIDService validBioIDService) {
		this.petitionerService = petitionerService;
		
	}

	  @RequestMapping(value = "/register")
	    public ModelAndView create(){	
	    	  return new ModelAndView("register"); 
	}
	  
	 

	  
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView save(Petitioner a) {
		petitionerService.save(a);
		return new ModelAndView("redirect:login");
	}
}
	
	/*
	 * @PostMapping("/register") public ModelAndView
	 * registerPetitioner(@Validated @ModelAttribute Petitioner petitioner,
	 * BindingResult result,
	 * 
	 * @RequestParam(value = "file", required = false) MultipartFile file,
	 * 
	 * @RequestParam(value = "bioID", required = false) String bioID, Model model) {
	 * 
	 * System.out.println("Petitioner Details:"); System.out.println("Full Name: " +
	 * petitioner.getFullName()); System.out.println("Email: " +
	 * petitioner.getEmail()); System.out.println("Date of Birth: " +
	 * petitioner.getDateOfBirth()); System.out.println("BioID: " +
	 * petitioner.getBioId());
	 * 
	 * 
	 * if (result.hasErrors()) { return new ModelAndView("register"); }
	 * 
	 * 
	 * 
	 * if (file != null && !file.isEmpty()) { try { File tempFile =
	 * File.createTempFile("uploaded-", ".png"); file.transferTo(tempFile); bioID =
	 * qrCodeService.decodeQRCode(tempFile); System.out.println("Decoded BioID: " +
	 * bioID); if (!qrCodeService.isValidQRCode(bioID)) {
	 * System.out.println("Invalid QR Code."); model.addAttribute("error",
	 * "Invalid BioID in QR Code."); return new ModelAndView("register"); } } catch
	 * (IOException e) { System.out.println("Error during QR code processing: " +
	 * e.getMessage()); model.addAttribute("error", "Error processing the QR code: "
	 * + e.getMessage()); return new ModelAndView("register"); } }
	 * 
	 * 
	 * if (bioID == null || bioID.isEmpty()) { model.addAttribute("error",
	 * "BioID is required. Please upload a QR code or enter a BioID."); return new
	 * ModelAndView("register"); }
	 * 
	 * if (!validBioIDService.isValidAndUnused(bioID)) { model.addAttribute("error",
	 * "Invalid or already used BioID."); return new ModelAndView("register"); }
	 * 
	 * validBioIDService.markAsUsed(bioID); petitioner.setBioId(bioID);
	 * petitionerService.registerPetitioner(petitioner);
	 * System.out.println("Petitioner Details:"); System.out.println("Full Name: " +
	 * petitioner.getFullName()); System.out.println("Email: " +
	 * petitioner.getEmail()); System.out.println("Date of Birth: " +
	 * petitioner.getDateOfBirth()); System.out.println("BioID: " +
	 * petitioner.getBioId()); return new
	 * ModelAndView("redirect:/petitioners/login"); }
	 */

	/*
	 * @PostMapping("/registerp") public String
	 * registerPetitioner(@Validated @ModelAttribute Petitioner petitioner,
	 * BindingResult result,
	 * 
	 * @RequestParam("file") MultipartFile file, Model model) { // Step 1: Check for
	 * validation errors in the form fields if (result.hasErrors()) { return
	 * "register"; }
	 * 
	 * // Step 2: Validate the QR code (BioID) try { // Save the uploaded file
	 * temporarily File tempFile = File.createTempFile("uploaded-", ".png");
	 * file.transferTo(tempFile);
	 * 
	 * // Decode the QR code from the uploaded file String bioID =
	 * qrCodeService.decodeQRCode(tempFile);
	 * 
	 * // Validate the BioID if (!validBioIDService.isValidBioID(bioID)) {
	 * model.addAttribute("error", "Invalid BioID in QR Code."); return "register";
	 * // Return to the registration form with an error }
	 * 
	 * // Set the valid BioID to the petitioner object petitioner.setBioId(bioID);
	 * 
	 * // Step 3: Register the petitioner
	 * petitionerService.registerPetitioner(petitioner);
	 * 
	 * // Step 4: Redirect to the login page after successful registration return
	 * "redirect:/petitioners/login";
	 * 
	 * } catch (IOException e) { model.addAttribute("error",
	 * "Error processing the QR code: " + e.getMessage()); return "register"; //
	 * Return to the registration form with an error }
	 */

