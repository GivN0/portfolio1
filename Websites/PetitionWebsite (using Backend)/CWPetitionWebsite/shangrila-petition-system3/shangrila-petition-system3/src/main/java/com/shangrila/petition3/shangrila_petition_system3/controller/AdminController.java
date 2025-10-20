package com.shangrila.petition3.shangrila_petition_system3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

//import com.shangrila.petition3.shangrila_petition_system3.service.AdminService;

  //usergeneratedpass 8c5332e3-94c7-4752-ac5d-d704c3b978dd
  
  @Controller
  
  @RequestMapping("/admin") public class AdminController {
  
		/*
		 * @Autowired private AdminService adminService;
		 * 
		 * @GetMapping("/dashboard") public String showDashboard(Model model) {
		 * model.addAttribute("petitions", adminService.getAllPetitions()); return
		 * "adminDashboard"; }
		 */
  
/*
 * @PostMapping("/setThreshold") public String setThreshold(@RequestParam int
 * threshold) { adminService.setSignatureThreshold(threshold); return
 * "redirect:/admin/dashboard"; }
 * 
 * 
 * @PostMapping("/respond") public String respondToPetition(@RequestParam
 * Integer petitionId, @RequestParam String response) {
 * adminService.respondToPetition(petitionId, response); return
 * "redirect:/admin/dashboard"; }
 * 
 * 
 * @Controller
 * 
 * @RequestMapping("/admin") public class AdminController {
 * 
 * @Autowired private AdminService adminService;
 * 
 * @GetMapping("/dashboard") public String showDashboard(Model model) {
 * List<Petition> petitions = adminService.getAllPetitions();
 * model.addAttribute("petitions", petitions); return "admin/dashboard"; }
 * 
 * @PostMapping("/set-threshold") public String
 * setSignatureThreshold(@RequestParam("threshold") int threshold) {
 * adminService.setSignatureThreshold(threshold); return
 * "redirect:/admin/dashboard"; }
 * 
 * @PostMapping("/respond") public String
 * respondToPetition(@RequestParam("petitionId") Long
 * petitionId, @RequestParam("response") String response) {
 * adminService.respondToPetition(petitionId, response); return
 * "redirect:/admin/dashboard"; } }
 */
  
  }
 