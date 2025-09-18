package com.fitnesstracker.backend.repositories;

import com.fitnesstracker.backend.entities.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
