package com.fitnesstracker.backend.services;

import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class RecordsService {

    public List<ExerciseRecordDto> allRecords() {
        return Arrays.asList(
                new ExerciseRecordDto(1L, "Pull-Ups", 0, 12),
                new ExerciseRecordDto(1L, "Biceps Curls", 16, 11)
        );
    }
}