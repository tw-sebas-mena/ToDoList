package org.example.to_do_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Setter
@Getter
public class ItemUpdateRequest {
    private String text;
    private Long userId;
    private LocalDate date;
    private Set<TagDTO> tags;
    private boolean isCompleted;
}
