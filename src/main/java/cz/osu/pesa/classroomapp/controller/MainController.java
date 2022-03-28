package cz.osu.pesa.classroomapp.controller;

import com.google.gson.Gson;
import cz.osu.pesa.classroomapp.model.*;
import cz.osu.pesa.classroomapp.model.json.ClassroomCover;
import cz.osu.pesa.classroomapp.model.json.ClassroomInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
public class MainController {
    private final DbRepo dbRepo;

    @Autowired
    public MainController(DbRepo dbRepo) {
        this.dbRepo = dbRepo;
    }

    @PostMapping(value = "/classrooms")
    public ResponseEntity<String> postClassrooms() {
        HttpClient client = HttpClient.newHttpClient();

        URI uri = UriComponentsBuilder.fromUriString("https://wsstag.osu.cz/ws/services/rest2/mistnost/getMistnostiInfo")
                .queryParam("outputFormat", "JSON").build().toUri();

        HttpRequest request = HttpRequest.newBuilder(uri).build();

        CompletableFuture<HttpResponse<String>> response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

        Gson gson = new Gson();

        try {
            ClassroomCover cover = gson.fromJson(response.get().body(), ClassroomCover.class);
            List<Classroom> classrooms = new ArrayList<>();

            for (ClassroomInfo classroomInfo : cover.getMistnostInfo()) {
                Classroom classroom = new Classroom();
                classroom.setBuildingAbbr(classroomInfo.getBuildingAbbr());
                try {
                    classroom.setClassroomNumber(Integer.parseInt(classroomInfo.getClassroomNumber()));
                } catch (NumberFormatException ex) {
                    classroom.setClassroomNumber(0);
                }
                classroom.setCapacity(classroomInfo.getCapacity());

                Department department = dbRepo.getDepartmentRepo()
                        .findDepartmentByDepartmentAbbr(classroomInfo.getDepartmentAbbr());
                if (department == null) {
                    department = dbRepo.getDepartmentRepo().save(new Department(classroomInfo.getDepartmentAbbr()));
                }

                classroom.setDepartment(department);

                classrooms.add(classroom);
            }
            dbRepo.getClassroomRepo().saveAll(classrooms);

            return ResponseEntity.status(HttpStatus.OK).body("CLASSROOMS SUCCESSFULLY UPLOADED");
        } catch (InterruptedException | ExecutionException e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("FAILED TO UPLOAD CLASSROOMS");
        }
    }

    @RequestMapping(value = "/classroom", method = {RequestMethod.POST})
    public ResponseEntity<String> handleClassroomUpload(@RequestBody Classroom classroom) {
        try {
            Classroom c = new Classroom();
            c.setBuildingAbbr(classroom.getBuildingAbbr());
            c.setClassroomNumber(classroom.getClassroomNumber());
            c.setCapacity(classroom.getCapacity());

            Department department = dbRepo.getDepartmentRepo()
                    .findDepartmentByDepartmentAbbr(classroom.getDepartment().getDepartmentAbbr());
            c.setDepartment(department);

            dbRepo.getClassroomRepo().save(c);

            return ResponseEntity.status(HttpStatus.OK).body("UPLOADED");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("FAILED! Message: " + e.getMessage());
        }

    }

    @GetMapping(value = "/classrooms")
    public ResponseEntity<List<Classroom>> getClassrooms() {
        return ResponseEntity.ok().body(dbRepo.getClassroomRepo().findAll());
    }

    @GetMapping(value = "/departments")
    public ResponseEntity<List<Department>> getDepartments() {
        return ResponseEntity.ok().body(dbRepo.getDepartmentRepo().findAll());
    }
}






