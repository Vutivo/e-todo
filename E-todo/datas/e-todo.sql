GRANT ALL PRIVILEGES ON etodo.* TO 'test'@'%';
FLUSH PRIVILEGES;

USE etodo;

CREATE TABLE IF NOT EXISTS `User`(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
   
CREATE TABLE IF NOT EXISTS Todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_time DATETIME,
    status ENUM('not started', 'todo', 'in progress', 'done') DEFAULT 'not started',
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `User`(id) ON DELETE CASCADE
);
 
INSERT INTO `User`(email, password, name, firstname) VALUES
('marie.dupont@pitech.eu', 'test', 'marie', 'dupont'),
('thomas.leroy@pitech.eu', 'test', 'thomas', 'leroy'),
('julie.martin@pitech.eu', 'test', 'julie', 'martin'),
('emma.petit@pitech.eu', 'test', 'emma', 'petit');
 
 
INSERT INTO Todo (title, description, created_at, due_time, status, user_id) VALUES
('Poubelle', 'Sortir la poubelle avant 20h', '2025-11-07 08:30:00', '2025-11-07 20:00:00', 'todo', 1),
('Courses', 'Acheter du lait, du pain et des œufs', '2025-11-07 09:00:00', '2025-11-07 18:00:00', 'todo', 1),
('Voiture', 'Faire la vidange et vérifier les pneus', '2025-11-07 10:00:00', '2025-11-10 12:00:00', 'in progress', 2),
('Factures', 'Payer la facture électrique', '2025-11-07 11:00:00', '2025-11-08 23:59:00', 'not started', 2),
('Réunion', 'Préparer la réunion du lundi matin', '2025-11-07 12:00:00', '2025-11-10 09:00:00', 'todo', 3),
('Sport', 'Aller courir 5 km', '2025-11-07 13:00:00', '2025-11-07 19:00:00', 'done', 3),
('Lecture', 'Lire 20 pages du livre en cours', '2025-11-07 14:00:00', '2025-11-07 22:00:00', 'not started', 4),
('Cuisine', 'Préparer le dîner pour ce soir', '2025-11-07 15:00:00', '2025-11-07 19:30:00', 'in progress', 4);