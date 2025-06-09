package org.example.to_do_backend.controllers;

import org.example.to_do_backend.model.ToDoItem;
import org.example.to_do_backend.services.ToDoItemService;
import org.springframework.web.bind.annotation.*;

@RestController
public class ToDoItemController {

    private final ToDoItemService toDoItemService;

    public ToDoItemController(ToDoItemService toDoItemService) {
        this.toDoItemService = toDoItemService;
    }

    @PostMapping("/todo")
    public void create(
            @RequestBody ToDoItem toDoItem
    ) {
        toDoItemService.create(toDoItem);
    }

    @GetMapping("/todo/{id}")
    public Iterable<ToDoItem> getAll(
            @PathVariable int id
    ) {
        return toDoItemService.findAllByUserId(id);
    }

    @PutMapping("/todo/{id}")
    public ToDoItem update(
            @PathVariable int id,
            @RequestBody ToDoItem toDoItem
    ){
        toDoItem.setId(id);
        return toDoItemService.update(toDoItem);
    }

    @DeleteMapping("/todo/{id}")
    public void delete(@PathVariable int id) {
        toDoItemService.delete(id);
    }
}
