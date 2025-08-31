package com.fitnesstracker.backend.mappers;

import com.fitnesstracker.backend.entities.ExerciseRecord;
import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExerciseRecordMapper {

    ExerciseRecord toExerciseRecordDto(ExerciseRecordDto dto);

    ExerciseRecordDto toExerciseRecord(ExerciseRecord exerciseRecord);

    List<ExerciseRecordDto> toExerciseRecordDtos(List<ExerciseRecord> exerciseRecords);

    @Mapping(target = "id", ignore = true)
    void updateExerciseRecord(@MappingTarget ExerciseRecord exerciseRecord, ExerciseRecordDto exerciseRecordDto);
}
