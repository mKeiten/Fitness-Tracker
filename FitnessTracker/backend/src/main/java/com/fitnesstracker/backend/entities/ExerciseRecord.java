package com.fitnesstracker.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class ExerciseRecord {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column
    private String exercise;
    @Column
    private Integer weight;
    @Column
    private Integer repeats;
}
