package com.fitnesstracker.backend.services;

import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import com.fitnesstracker.backend.entities.ExerciseRecord;
import com.fitnesstracker.backend.exceptions.AppException;
import com.fitnesstracker.backend.mappers.ExerciseRecordMapper;
import com.fitnesstracker.backend.repositories.ExerciseRecordsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RecordsService {

    private final ExerciseRecordsRepository exerciseRecordsRepository;
    private final ExerciseRecordMapper exerciseRecordMapper;

    public List<ExerciseRecordDto> allRecords() {
        return exerciseRecordMapper.toExerciseRecordDtos(exerciseRecordsRepository.findAll());
    }

    public ExerciseRecordDto createExerciseRecord(ExerciseRecordDto exerciseRecordDto) {
        ExerciseRecord exerciseRecord = exerciseRecordMapper.toExerciseRecordDto(exerciseRecordDto);
        ExerciseRecord createdExerciseRecord = exerciseRecordsRepository.save(exerciseRecord);

        return exerciseRecordMapper.toExerciseRecord(createdExerciseRecord);
    }

    public ExerciseRecordDto deleteExerciseRecord(Long id) {
        ExerciseRecord exerciseRecord = exerciseRecordsRepository.findById(id)
                .orElseThrow(() -> new AppException("Exercise Record not found", HttpStatus.NOT_FOUND));
        ExerciseRecordDto exerciseRecordDto = exerciseRecordMapper.toExerciseRecord(exerciseRecord);
        exerciseRecordsRepository.deleteById(id);

        return exerciseRecordDto;
    }

}