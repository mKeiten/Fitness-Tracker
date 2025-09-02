package com.fitnesstracker.backend.services;

import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import com.fitnesstracker.backend.entities.ExerciseRecord;
import com.fitnesstracker.backend.entities.Session;
import com.fitnesstracker.backend.exceptions.AppException;
import com.fitnesstracker.backend.mappers.ExerciseRecordMapper;
import com.fitnesstracker.backend.repositories.ExerciseRecordsRepository;
import com.fitnesstracker.backend.repositories.SessionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RecordsService {

    private final ExerciseRecordsRepository exerciseRecordsRepository;
    private final ExerciseRecordMapper exerciseRecordMapper;
    private final SessionRepository sessionRepository;

    public List<ExerciseRecordDto> allRecords() {
        return exerciseRecordMapper.toExerciseRecordDtos(exerciseRecordsRepository.findAll());
    }

    public ExerciseRecordDto createExerciseRecord(ExerciseRecordDto exerciseRecordDto) {
//        Session session = sessionRepository.findById(exerciseRecordDto.getSessionId()).orElseThrow(() -> new AppException("Session not found", HttpStatus.NOT_FOUND));
        ExerciseRecord exerciseRecord = exerciseRecordMapper.toExerciseRecordDto(exerciseRecordDto);
//        exerciseRecord.setSession(session);
        ExerciseRecord createdExerciseRecord = exerciseRecordsRepository.save(exerciseRecord);

        return exerciseRecordMapper.toExerciseRecord(createdExerciseRecord);
    }
    @Transactional
    public ExerciseRecordDto deleteExerciseRecord(Long sessionId, Long exerciseRecordId) {
        Session session = sessionRepository.findById(sessionId).orElseThrow(() -> new RuntimeException("Session not found"));

        ExerciseRecord exerciseRecord = session.getExercises().stream().filter(e -> e.getId().equals(exerciseRecordId)).findFirst().orElseThrow(() -> new RuntimeException("Exercise not found"));
        ExerciseRecordDto exerciseRecordDto = exerciseRecordMapper.toExerciseRecord(exerciseRecord);
        session.getExercises().remove(exerciseRecord);

        if(session.getExercises().isEmpty()) {
            sessionRepository.delete(session);
        }
        return exerciseRecordDto;
    }

    public ExerciseRecordDto updateExerciseRecord(Long id, ExerciseRecordDto exerciseRecordDto) {
        ExerciseRecord exerciseRecord = exerciseRecordsRepository.findById(id)
                .orElseThrow(() -> new AppException("Exercise Record not found", HttpStatus.NOT_FOUND));
        exerciseRecordMapper.updateExerciseRecord(exerciseRecord, exerciseRecordDto);
        ExerciseRecord savedExerciseRecord = exerciseRecordsRepository.save(exerciseRecord);

        return exerciseRecordMapper.toExerciseRecord(savedExerciseRecord);
    }

}