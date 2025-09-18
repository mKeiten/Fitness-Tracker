package com.fitnesstracker.backend.controllers;

import com.fitnesstracker.backend.dtos.GoalDto;
import com.fitnesstracker.backend.services.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class GoalController {
    private final GoalService goalService;

    @GetMapping("/exercises/goals")
    public ResponseEntity<List<GoalDto>> allGoals() {
        return ResponseEntity.ok(goalService.allGoals());
    }

    @PostMapping("exercises/goals")
    public ResponseEntity<GoalDto> createGoal(@RequestBody final GoalDto goalDto) {
        GoalDto createdGoal = goalService.createGoal(goalDto);
        return ResponseEntity.created(URI.create("exercises/goals" + createdGoal.getId())).body(createdGoal);
    }

    @DeleteMapping("exercises/goals/{id}")
    public ResponseEntity<GoalDto> deleteGoal(@PathVariable final Long id) {
        return ResponseEntity.ok(goalService.deleteGoal(id));
    }

    @PutMapping("/exercises/goals/{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable final Long id, @RequestBody final GoalDto goalDto) {
        return ResponseEntity.ok(goalService.updateGoal(id, goalDto));
    }
}
