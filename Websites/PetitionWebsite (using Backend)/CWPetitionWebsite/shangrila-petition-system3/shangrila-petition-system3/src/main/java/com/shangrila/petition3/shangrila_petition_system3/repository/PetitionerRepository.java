package com.shangrila.petition3.shangrila_petition_system3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;


@Repository
public interface PetitionerRepository extends CrudRepository<Petitioner, String> {
    boolean existsByEmail(String email);
    boolean existsByBioId(String bioId);
	
	//List<Petitioner> findByFirstName(String firstName);
    Petitioner findByEmail(String email);  // This will allow you to authenticate a petitioner by email

}

