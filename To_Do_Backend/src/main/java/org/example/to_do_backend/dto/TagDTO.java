package org.example.to_do_backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.to_do_backend.entities.Tag;

@Setter
@Getter
public class TagDTO {

    private String tagName;
    private String colorCode;

}
