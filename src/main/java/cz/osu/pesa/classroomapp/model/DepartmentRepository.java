package cz.osu.pesa.classroomapp.model;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DepartmentRepository extends CrudRepository<Department, Integer> {
    @Override
    List<Department> findAll();

    Department findDepartmentByDepartmentAbbr(String str);
}
