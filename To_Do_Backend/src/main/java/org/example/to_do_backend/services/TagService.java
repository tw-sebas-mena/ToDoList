package org.example.to_do_backend.services;

import org.example.to_do_backend.dto.TagDTO;
import org.example.to_do_backend.entities.Tag;
import org.example.to_do_backend.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(final TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<TagDTO> findAllTags() {
        List<Tag> tags = tagRepository.findAll();
        List<TagDTO> returnTags = new ArrayList<>();
        for (Tag tag : tags) {
            TagDTO tagDTO = new TagDTO();
            tagDTO.setTagName(tag.getName());
            tagDTO.setColorCode(tag.getColor());
            returnTags.add(tagDTO);
        }

        return returnTags;
    }



}
