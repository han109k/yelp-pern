CREATE TABLE reviews (
    id SERIAL NOT NULL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 AND rating <=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (2, 'Valerie', 'Its okay', 4);