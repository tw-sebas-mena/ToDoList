CREATE TABLE `USER`
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE TO_DO_ITEM
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    user_id      INT          NOT NULL,
    text         VARCHAR(500) NOT NULL,
    date         DATE         NOT NULL,
    is_completed BOOLEAN      NOT NULL
);
