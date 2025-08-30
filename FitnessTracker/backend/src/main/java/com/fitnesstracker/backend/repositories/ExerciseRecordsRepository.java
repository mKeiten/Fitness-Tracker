package com.fitnesstracker.backend.repositories;
import com.fitnesstracker.backend.entities.ExerciseRecord;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ExerciseRecordsRepository extends JpaRepository<ExerciseRecord, Long> {
}
