package org.example.to_do_backend.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.to_do_backend.dto.ItemRequest;
import org.example.to_do_backend.dto.ItemResponse;
import org.example.to_do_backend.dto.ItemUpdateRequest;
import org.example.to_do_backend.dto.TagDTO;
import org.example.to_do_backend.entities.Tag;
import org.example.to_do_backend.entities.Item;
import org.example.to_do_backend.repositories.TagRepository;
import org.example.to_do_backend.repositories.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final TagRepository tagRepository;

    public ItemService(ItemRepository itemRepository, TagRepository tagRepository) {
        this.itemRepository = itemRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional
    public ItemResponse create(ItemRequest itemRequest) {
        Item item = new Item();
        item.setText(itemRequest.getText());
        item.setDate(itemRequest.getDate());
        item.setUserId(itemRequest.getUserId());
        item.setCompleted(false);

        Set<Tag> tags = processTags(itemRequest.getTags().stream()
                .map(TagDTO::getTagName).collect(Collectors.toSet()));
        item.setTags(tags);

        Item itemSaved = itemRepository.save(item);
        return ItemResponse.fromEntity(itemSaved);
    }

    @Transactional
    public ItemResponse update(Long id, ItemUpdateRequest requestDto) {
        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found with id: " + id));

        existingItem.setText(requestDto.getText());
        existingItem.setDate(requestDto.getDate());
        existingItem.setCompleted(requestDto.isCompleted());
        Set<Tag> tags = processTags(requestDto.getTags().stream()
                .map(TagDTO::getTagName)
                .collect(Collectors.toSet()));
        existingItem.setTags(tags);

        Item itemUpdated = itemRepository.save(existingItem);
        return ItemResponse.fromEntity(itemUpdated);

    }

    public List<ItemResponse> findAllByUserId(Long userId) {
        return itemRepository.findByUserId(userId).stream()
                .map(ItemResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public void delete(Long id) {
        itemRepository.deleteById(id);
    }

    private Set<Tag> processTags(Set<String> tagNames) {
        if (tagNames == null || tagNames.isEmpty()) {
            return new HashSet<>();
        }

        Set<Tag> existingTags = tagRepository.findByNameIn(tagNames);

        if (existingTags.size() != tagNames.size()) {
            Set<String> foundTagNames = existingTags.stream()
                    .map(Tag::getName)
                    .collect(Collectors.toSet());

            String missingTags = tagNames.stream()
                    .filter(name -> !foundTagNames.contains(name))
                    .collect(Collectors.joining(", "));

            throw new EntityNotFoundException("Could not create item. The following predefined tags were not found: " + missingTags);
        }
        return existingTags;
    }

}
