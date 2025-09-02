package com.fitnesstracker.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ExerciseRecordDto {
    private Long id;
    private String exercise;
    private Integer weight;
    private Integer repeats;
    private Integer sets;
    private Long sessionId;
}
