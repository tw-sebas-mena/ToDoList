package org.example.to_do_backend.repositories;

import org.example.to_do_backend.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByUserId(Long userId);

}
