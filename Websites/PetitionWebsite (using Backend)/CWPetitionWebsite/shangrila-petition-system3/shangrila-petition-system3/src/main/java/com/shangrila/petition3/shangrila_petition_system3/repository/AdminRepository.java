package com.shangrila.petition3.shangrila_petition_system3.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shangrila.petition3.shangrila_petition_system3.domain.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
