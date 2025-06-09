package org.example.to_do_backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;

import lombok.Data;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Data
@Table("TO_DO_ITEM")
public class ToDoItem {
    @Id
    private int id;

    private int userId;

    private String text;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private boolean isCompleted;
}
