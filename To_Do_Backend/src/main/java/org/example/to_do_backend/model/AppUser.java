package org.example.to_do_backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;


@Data
@Table("USER")
public class AppUser {
    @Id
    Long id;

    String username;
    String password;
}
