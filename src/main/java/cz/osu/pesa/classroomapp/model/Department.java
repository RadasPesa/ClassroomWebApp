package cz.osu.pesa.classroomapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer departmentId;

    @Column(nullable = false)
    private String departmentAbbr;

    public Department(String departmentAbbr) {
        this.departmentAbbr = departmentAbbr;
    }
}
