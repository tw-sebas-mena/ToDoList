package org.example.to_do_backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "TAG")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    @Column(nullable = false, unique = true)
    private String name;

//    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private Set<Item> items;

    public Tag() {}

    public Tag(String name) {
        this.name = name;
    }
}
