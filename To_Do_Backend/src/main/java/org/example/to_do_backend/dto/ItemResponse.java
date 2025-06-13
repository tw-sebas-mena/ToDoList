package org.example.to_do_backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.to_do_backend.entities.Tag;
import org.example.to_do_backend.entities.Item;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ItemResponse {
    private Long id;
    private String text;
    private boolean completed;
    private LocalDate date;
    private List<TagDTO> tags = new ArrayList<>();

    public static ItemResponse fromEntity(Item item) {
        ItemResponse dto = new ItemResponse();
        dto.setId(item.getItemId());
        dto.setText(item.getText());
        dto.setCompleted(item.isCompleted());
        dto.setDate(item.getDate());
        for (Tag tag : item.getTags()) {
            TagDTO tagDTO = new TagDTO();
            tagDTO.setTagName(tag.getName());
            tagDTO.setColorCode(tag.getColor());
            dto.tags.add(tagDTO);
        }
        return dto;
    }
}
