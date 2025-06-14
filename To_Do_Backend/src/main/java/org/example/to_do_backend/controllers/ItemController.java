package org.example.to_do_backend.controllers;

import org.example.to_do_backend.dto.ItemRequest;
import org.example.to_do_backend.dto.ItemResponse;
import org.example.to_do_backend.dto.ItemUpdateRequest;
import org.example.to_do_backend.dto.TagDTO;
import org.example.to_do_backend.services.ItemService;
import org.example.to_do_backend.services.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class ItemController {

    private final ItemService itemService;
    private final TagService tagService;

    public ItemController(ItemService itemService, TagService tagService) {

        this.itemService = itemService;
        this.tagService = tagService;
    }

    @PostMapping
    public ResponseEntity<ItemResponse> create(
            @RequestBody ItemRequest requestDto
    ) {
        ItemResponse itemResponse = itemService.create(requestDto);
        return new ResponseEntity<>(itemResponse, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ItemResponse>> findAllByUserId(
            @PathVariable Long userId
    ) {
        List<ItemResponse> items = itemService.findAllByUserId(userId);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/tags")
    public ResponseEntity<List<TagDTO>> findAll() {
        List<TagDTO> tags = tagService.findAllTags();
        return ResponseEntity.ok(tags);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> update(
            @PathVariable Long id,
            @RequestBody ItemUpdateRequest requestDto
    ) {
        ItemResponse updatedItem = itemService.update(id, requestDto);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id
    ) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
