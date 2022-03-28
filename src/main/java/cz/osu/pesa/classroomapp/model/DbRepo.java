package cz.osu.pesa.classroomapp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Repository;

@Repository
@Getter
@AllArgsConstructor
public class DbRepo {
    private ClassroomRepository classroomRepo;
    private DepartmentRepository departmentRepo;
}
