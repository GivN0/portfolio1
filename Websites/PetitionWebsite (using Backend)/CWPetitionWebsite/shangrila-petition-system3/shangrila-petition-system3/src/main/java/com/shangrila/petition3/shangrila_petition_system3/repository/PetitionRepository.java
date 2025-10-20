package com.shangrila.petition3.shangrila_petition_system3.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shangrila.petition3.shangrila_petition_system3.domain.Petition;
import com.shangrila.petition3.shangrila_petition_system3.domain.Petitioner;



@Repository
public interface PetitionRepository extends CrudRepository<Petition, Integer> {
	
	
	List<Petition> findAll();
	Optional<Petition> findById(Integer id);
	 // Replace the old method
    List<Petition> findByStatus(String status); // Query based on the "status" field
	//void saveAll(List<Petition> petitions);
	
}

