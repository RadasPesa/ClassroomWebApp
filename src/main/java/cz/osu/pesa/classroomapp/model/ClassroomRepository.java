package cz.osu.pesa.classroomapp.model;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClassroomRepository extends CrudRepository<Classroom, Integer> {
    @Override
    List<Classroom> findAll();
}
