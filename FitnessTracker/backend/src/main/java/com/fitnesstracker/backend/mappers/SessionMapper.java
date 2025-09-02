package com.fitnesstracker.backend.mappers;

import com.fitnesstracker.backend.entities.ExerciseRecord;
import com.fitnesstracker.backend.entities.Session;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import com.fitnesstracker.backend.dtos.SessionDto;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ExerciseRecordMapper.class})
public interface SessionMapper {

    @Mapping(target = "exercises", source = "exercises")
    Session toSessionDto(SessionDto dto);
    SessionDto toSession(Session session);
    List<SessionDto> toSessionDtos(List<Session> sessions);

    @Mapping(target = "id", ignore = true)
    void updateSession(@MappingTarget Session session, SessionDto sessionDto);

    @AfterMapping
    default void linkExercises(@MappingTarget Session session) {
        if (session.getExercises() != null) {
            for(ExerciseRecord ex : session.getExercises()) {
                ex.setSession(session);
            }
        }
    }
}
