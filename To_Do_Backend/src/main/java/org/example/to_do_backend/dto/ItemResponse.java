package org.example.to_do_backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.to_do_backend.entities.Tag;
import org.example.to_do_backend.entities.Item;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class ItemResponse {
    private Long id;
    private String text;
    private boolean completed;
    private LocalDate date;
    private Set<String> tags;

    public static ItemResponse fromEntity(Item item) {
        ItemResponse dto = new ItemResponse();
        dto.setId(item.getItemId());
        dto.setText(item.getText());
        dto.setCompleted(item.isCompleted());
        dto.setDate(item.getDate());
        dto.setTags(item.getTags()
                .stream()
                .map(Tag::getName)
                .collect(Collectors.toSet()));
        return dto;
    }
}
