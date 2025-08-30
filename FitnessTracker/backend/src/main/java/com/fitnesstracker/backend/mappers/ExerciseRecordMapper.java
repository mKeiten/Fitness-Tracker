package com.fitnesstracker.backend.mappers;

import com.fitnesstracker.backend.entities.ExerciseRecord;
import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExerciseRecordMapper {

    ExerciseRecordDto toExerciseRecord(ExerciseRecord exerciseRecord);
    ExerciseRecord toExerciseRecordDto(ExerciseRecordDto dto);
    List<ExerciseRecordDto> toExerciseRecordDtos(List<ExerciseRecord> exerciseRecord);
}
