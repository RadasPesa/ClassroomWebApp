package cz.osu.pesa.classroomapp;

import cz.osu.pesa.classroomapp.model.Department;
import cz.osu.pesa.classroomapp.model.DepartmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClassroomAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClassroomAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(DepartmentRepository dRepo) {
        return (args -> {
            //fillDb(dRepo);
        });
    }

    private void fillDb(DepartmentRepository dRepo) {
        dRepo.save(new Department("KIP"));
    }
}
