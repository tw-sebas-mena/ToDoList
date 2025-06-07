package org.example.to_do_backend.repositories;

import org.example.to_do_backend.model.ToDoItem;
import org.springframework.data.repository.CrudRepository;

public interface ToDoItemRepository extends CrudRepository<ToDoItem, Long> {


    Iterable<ToDoItem> findByUserId(int userId);
}
