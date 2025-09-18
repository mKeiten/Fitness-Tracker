package com.fitnesstracker.backend.services;

import com.fitnesstracker.backend.dtos.GoalDto;
import com.fitnesstracker.backend.entities.Goal;
import com.fitnesstracker.backend.exceptions.AppException;
import com.fitnesstracker.backend.mappers.GoalMapper;
import com.fitnesstracker.backend.repositories.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;

    public List<GoalDto> allGoals() {
        return goalMapper.toGoalDtos(goalRepository.findAll());
    }

    public GoalDto createGoal(GoalDto goalDto) {
        return goalMapper.toGoal(goalRepository.save(goalMapper.toGoalDto(goalDto)));
    }

    public GoalDto deleteGoal(Long goalId) {
        Goal goal = goalRepository.findById(goalId).
                orElseThrow(() -> new AppException("Goal not found", HttpStatus.NOT_FOUND));
        GoalDto goalDto = goalMapper.toGoal(goal);
        goalRepository.deleteById(goalId);

        return goalDto;
    }

    public GoalDto updateGoal(Long goalId, GoalDto goalDto) {
        Goal goal = goalRepository.findById(goalId).
                orElseThrow(() -> new AppException("Goal not found", HttpStatus.NOT_FOUND));
        goalMapper.updateGoal(goal, goalDto);
        return goalMapper.toGoal(goalRepository.save(goal));
    }
}
