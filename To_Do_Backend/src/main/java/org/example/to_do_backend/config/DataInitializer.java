package org.example.to_do_backend.config;

import org.example.to_do_backend.entities.AppUser;
import org.example.to_do_backend.entities.Item;
import org.example.to_do_backend.entities.Tag;
import org.example.to_do_backend.repositories.ItemRepository;
import org.example.to_do_backend.repositories.TagRepository;
import org.example.to_do_backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    public final ItemRepository itemRepository;

    public DataInitializer(TagRepository tagRepository, UserRepository userRepository, ItemRepository itemRepository) {
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public void run(String... args)  {
        if (tagRepository.count() == 0) {
            Tag work = new Tag("Work", "#a1423b");
            Tag home = new Tag("Home", "#7aa0cf");
            Tag fitness = new Tag("Fitness", "#ba6cac");

            tagRepository.saveAll(List.of(work, home, fitness));

            AppUser appUser = new AppUser();
            appUser.setUsername("sebasm111");
            appUser.setPassword("$2a$10$rd/IQxCZ917bInBY7fdxUuJgQWwPrI58uzkwkRmZlNkQ95mwzySAG");

            userRepository.save(appUser);


            Item item = new Item();
            item.setText("Finish the Spring Boot migration");
            item.setDate(LocalDate.now().plusDays(1));
            item.setUserId((long) 1);
            item.setCompleted(false);
            item.setTags(new HashSet<>(List.of(work, home))); // associate multiple tags

            Item item2 = new Item();
            item2.setText("Test the Spring Boot migration");
            item2.setDate(LocalDate.now().plusDays(2));
            item2.setCompleted(false);
            item2.setUserId((long) 1);
            item2.setTags(new HashSet<>(List.of(fitness, home))); // associate multiple tags

            itemRepository.saveAll(List.of(item, item2));


        }

    }
}
