package com.fitnesstracker.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Goal {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column
    private String exercise;

    @Column
    private Double targetWeight;

    @Column
    private Integer targetRepeats;

    @Column
    private Integer targetDuration;

    @Column
    private Integer targetSets;

    @Column
    private Date deadline;

    @Column
    private Boolean achieved = false;

}
