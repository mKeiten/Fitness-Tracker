package com.fitnesstracker.backend.controllers;

import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import com.fitnesstracker.backend.services.RecordsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RecordsController {

    private final RecordsService recordsService;

    @GetMapping("/exercises/records")
    public ResponseEntity<List<ExerciseRecordDto>> allRecords() {
        return ResponseEntity.ok(recordsService.allRecords());
    }
}