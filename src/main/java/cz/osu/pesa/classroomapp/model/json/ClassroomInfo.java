package cz.osu.pesa.classroomapp.model.json;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ClassroomInfo {
    @SerializedName(value = "zkrBudovy")
    private String buildingAbbr;
    @SerializedName(value = "cisloMistnosti")
    private String classroomNumber;
    @SerializedName(value = "katedra")
    private String departmentAbbr;
    @SerializedName(value = "kapacita")
    private Integer capacity;
}
