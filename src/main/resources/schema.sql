CREATE TABLE `user` (
    `id` varchar(36) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `name` varchar(45) NOT NULL,
    `age` varchar(45) DEFAULT NULL,
    `sex` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;