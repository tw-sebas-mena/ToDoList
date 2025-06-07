INSERT INTO `USER`(username, password)
VALUES ('sebasm111', '$2a$10$fFY8qO2Hb0a1gw8EF09C4u5FKBlwDZ/XSR089p1EwXl3f8HuIu/va');

INSERT INTO `USER`(username, password)
VALUES ('bryana1', '$2a$10$FHGa/UyhpTroRKPLHtVGOu4IgjBy0q33rgV1bgRaLSlQWP5uWD2ou');


INSERT
INTO TO_DO_ITEM (user_id, text, date, is_completed)
VALUES (1, 'User 1 hello', '2025-05-30', false);

INSERT
INTO TO_DO_ITEM (user_id, text, date, is_completed)
VALUES (1, 'User 1 how are u', '2025-06-05', false);

INSERT
INTO TO_DO_ITEM (user_id, text, date, is_completed)
VALUES (1, 'User 1 bye', '2025-06-15', true);

INSERT
INTO TO_DO_ITEM (user_id, text, date, is_completed)
VALUES (2, 'User 2 hello', '2025-06-15', true);

INSERT
INTO TO_DO_ITEM (user_id, text, date, is_completed)
VALUES (2, 'User 2 bye', '2025-05-30', false);