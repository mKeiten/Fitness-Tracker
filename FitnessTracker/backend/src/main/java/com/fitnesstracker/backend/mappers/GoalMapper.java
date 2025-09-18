package com.fitnesstracker.backend.mappers;

import com.fitnesstracker.backend.dtos.GoalDto;
import com.fitnesstracker.backend.entities.Goal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GoalMapper {
    Goal toGoalDto(GoalDto dto);

    GoalDto toGoal(Goal goal);

    List<GoalDto> toGoalDtos(List<Goal> goals);

    @Mapping(target = "id", ignore = true)
    void updateGoal(@MappingTarget Goal goal, GoalDto goalDto);
}
