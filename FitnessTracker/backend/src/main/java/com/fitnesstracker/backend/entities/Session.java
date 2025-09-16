package com.fitnesstracker.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column
    private Date date;
    @OneToMany(mappedBy ="session", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExerciseRecord> exercises;
}
