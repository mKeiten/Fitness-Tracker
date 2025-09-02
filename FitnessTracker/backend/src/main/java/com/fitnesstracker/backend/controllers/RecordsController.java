package com.fitnesstracker.backend.controllers;

import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import com.fitnesstracker.backend.services.RecordsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RecordsController {

    private final RecordsService recordsService;

    @GetMapping("/exercises/records")
    public ResponseEntity<List<ExerciseRecordDto>> allRecords() {
        return ResponseEntity.ok(recordsService.allRecords());
    }

    @PostMapping("/exercises/records")
    public ResponseEntity<ExerciseRecordDto> createRecord(@RequestBody final ExerciseRecordDto exerciseRecordDto) {
        ExerciseRecordDto createdExerciseRecord = recordsService.createExerciseRecord(exerciseRecordDto);
        return ResponseEntity.created(URI.create("/exercises/records/" + createdExerciseRecord.getId())).body(createdExerciseRecord);
    }

    @DeleteMapping("/{sessionId}/exercises/records/{exerciseId}")
    public ResponseEntity<ExerciseRecordDto> deleteExerciseRecord(@PathVariable Long sessionId, @PathVariable Long exerciseId) {
        return ResponseEntity.ok(recordsService.deleteExerciseRecord(sessionId, exerciseId));
    }

    @PutMapping("/exercises/records/{id}")
    public ResponseEntity<ExerciseRecordDto> updateExerciseRecord(@PathVariable Long id, @RequestBody final ExerciseRecordDto exerciseRecordDto) {
        return ResponseEntity.ok(recordsService.updateExerciseRecord(id, exerciseRecordDto));
    }

}