package org.example.to_do_backend.services;

import jakarta.persistence.EntityNotFoundException;
import org.example.to_do_backend.model.ToDoItem;
import org.example.to_do_backend.repositories.ToDoItemRepository;
import org.springframework.stereotype.Service;

@Service
public class ToDoItemService {

    private final ToDoItemRepository toDoItemRepository;

    public ToDoItemService(ToDoItemRepository toDoItemRepository) {
        this.toDoItemRepository = toDoItemRepository;
    }

    public Iterable<ToDoItem> findAll() {
        return toDoItemRepository.findAll();
    }

    public void create(ToDoItem toDoItem) {
        toDoItemRepository.save(toDoItem);
    }

    public ToDoItem update(ToDoItem updated) {
        ToDoItem existing = toDoItemRepository.findById((long) updated.getId())
                .orElseThrow(() -> new EntityNotFoundException());
        existing.setText(updated.getText());
        existing.setCompleted(updated.isCompleted());
        existing.setDate(updated.getDate());
        return toDoItemRepository.save(existing);
    }

    public Iterable<ToDoItem> findAllByUserId(int userId) {
        return toDoItemRepository.findByUserId(userId);
    }

    public void delete(int id) {
        toDoItemRepository.deleteById((long) id);
    }

}
