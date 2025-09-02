package com.fitnesstracker.backend.controllers;

import com.fitnesstracker.backend.dtos.SessionDto;
import com.fitnesstracker.backend.services.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionsService;

    @GetMapping("/exercises/sessions")
    public ResponseEntity<List<SessionDto>> allSessions() {
        return ResponseEntity.ok(sessionsService.allSessions());
    }

    @PostMapping("/exercises/sessions")
    public ResponseEntity<SessionDto> createSession(@RequestBody final SessionDto sessionDto) {
        SessionDto createdSession = sessionsService.createSession(sessionDto);
        return ResponseEntity.created(URI.create("/exercises/sessions/" + createdSession.getId())).body(createdSession);
    }

    @DeleteMapping("/exercises/sessions/{id}")
    public ResponseEntity<SessionDto> deleteSession(@PathVariable Long id) {
        return ResponseEntity.ok(sessionsService.deleteSession(id));
    }

    @PutMapping("/exercises/sessions/{id}")
    public ResponseEntity<SessionDto> updateSession(@PathVariable Long id, @RequestBody final SessionDto sessionDto) {
        return ResponseEntity.ok(sessionsService.updateSession(id, sessionDto));
    }

}