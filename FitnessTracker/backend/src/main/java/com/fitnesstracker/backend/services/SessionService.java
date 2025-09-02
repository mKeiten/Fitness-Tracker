package com.fitnesstracker.backend.services;

import com.fitnesstracker.backend.dtos.ExerciseRecordDto;
import com.fitnesstracker.backend.dtos.SessionDto;
import com.fitnesstracker.backend.entities.ExerciseRecord;
import com.fitnesstracker.backend.entities.Session;
import com.fitnesstracker.backend.exceptions.AppException;
import com.fitnesstracker.backend.mappers.SessionMapper;
import com.fitnesstracker.backend.repositories.ExerciseRecordsRepository;
import com.fitnesstracker.backend.repositories.SessionRepository;
import com.fitnesstracker.backend.controllers.RecordsController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;
    private final SessionMapper sessionMapper;
    private final RecordsController recordsController;
    private final ExerciseRecordsRepository recordsRepository;

    public List<SessionDto> allSessions() {
        return sessionMapper.toSessionDtos(sessionRepository.findAll());
    }

    public SessionDto createSession(SessionDto sessionDto) {
        Session session = sessionMapper.toSessionDto(sessionDto);
        Session createdSession = sessionRepository.save(session);
        return sessionMapper.toSession(createdSession);
    }

    public SessionDto deleteSession(Long id) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new AppException("Exercise Record not found", HttpStatus.NOT_FOUND));
        SessionDto sessionDto = sessionMapper.toSession(session);
        sessionRepository.deleteById(id);

        return sessionDto;
    }

    public SessionDto updateSession(Long id, SessionDto SessionDto) {
        Session Session = sessionRepository.findById(id)
                .orElseThrow(() -> new AppException("Exercise Record not found", HttpStatus.NOT_FOUND));
        sessionMapper.updateSession(Session, SessionDto);
        Session savedSession = sessionRepository.save(Session);

        return sessionMapper.toSession(savedSession);
    }

}