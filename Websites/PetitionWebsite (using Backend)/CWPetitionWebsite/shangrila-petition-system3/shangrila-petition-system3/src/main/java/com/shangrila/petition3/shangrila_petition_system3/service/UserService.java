package com.shangrila.petition3.shangrila_petition_system3.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shangrila.petition3.shangrila_petition_system3.domain.Admin;
import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;
import com.shangrila.petition3.shangrila_petition_system3.domain.SHA256Encoder;
import com.shangrila.petition3.shangrila_petition_system3.repository.AdminRepository;
import com.shangrila.petition3.shangrila_petition_system3.repository.PetitionerRepository;

@Service
public class UserService {
    @Autowired
    private AdminRepository adminRepository;
    private SHA256Encoder encoder;

    @Autowired
    private PetitionerRepository petitionerRepository;

        public String validateUser(String email, String password) {
            String encodedPassword = encoder.encodePassword(password);

            // Check if the user is an admin
            Admin admin = adminRepository.findByEmail(email);
            if (admin != null) {
                if (admin.getPassword().equals(encodedPassword)) {
                    return "ADMIN";
                }
            }

            // Check if the user is a petitioner
            Petitioner petitioner = petitionerRepository.findByEmail(email);
            if (petitioner != null) {
                if (petitioner.getPassword().equals(encodedPassword)) {
                    return "PETITIONER";
                }
            }

            // If no match, return null
            return null;
        }
    }


