package org.example.to_do_backend.repositories;

import org.example.to_do_backend.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.Set;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByNameIgnoreCase(String name);

    Set<Tag> findByNameIn(Set<String> names);


}
