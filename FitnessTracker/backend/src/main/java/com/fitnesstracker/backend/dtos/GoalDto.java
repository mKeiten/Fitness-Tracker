package com.fitnesstracker.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GoalDto {
    private Long id;
    private String exercise;
    private Double targetWeight;
    private Integer targetRepeats;
    private Integer duration;
    private Integer targetSets;
    private Date deadline;
    private Boolean achieved;
}
