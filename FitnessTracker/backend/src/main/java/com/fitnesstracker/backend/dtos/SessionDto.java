package com.fitnesstracker.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SessionDto {
    private Long id;
    private Date date;
    private List<ExerciseRecordDto> exercises;
}
