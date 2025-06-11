package org.example.to_do_backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class ItemRequest {
    private String text;
    private Long userId;
    private LocalDate date;
    private Set<String> tags;
}
