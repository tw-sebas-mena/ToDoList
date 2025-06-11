package org.example.to_do_backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="ITEM")
@Getter
@Setter
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "user_id",nullable = false)
    private Long userId;

    @Column(nullable = false, length = 500)
    private String text;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column(nullable = false, name = "is_completed")
    private boolean isCompleted;


    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "ITEM_TAG",
            joinColumns = @JoinColumn(name="item_id"),
            inverseJoinColumns = @JoinColumn(name="tag_id")
    )
    @JsonManagedReference
    private Set<Tag> tags;

    public Set<Tag> getTags() {
        if (tags == null) {
            tags = new HashSet<>();
        }
        return tags;
    }

}
