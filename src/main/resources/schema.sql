DROP TABLE IF EXISTS `Roles`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Todos`;

CREATE TABLE `Roles` (
    `RoleId` INTEGER NOT NULL,
    `RoleName` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`RoleId`)
) ENGINE=InnoDB;

INSERT INTO `Roles`(`RoleId`, `RoleName`) VALUES (0, 'ADMIN');
INSERT INTO `Roles`(`RoleId`, `RoleName`) VALUES (1, 'USER');

CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `firstName` varchar(50) NOT NULL,
    `lastName` varchar(50) NOT NULL,
    `username` varchar(45) NOT NULL,
    `password` varchar(255) NOT NULL,
    `RoleId` INTEGER NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`RoleId`) REFERENCES Roles(`RoleId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `Todos` (
    `TodoId` INTEGER NOT NULL AUTO_INCREMENT,
    `Description` VARCHAR(255) NOT NULL,
    `IsDone` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,
    PRIMARY KEY (`TodoId`),
    FOREIGN KEY (`UserId`) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
