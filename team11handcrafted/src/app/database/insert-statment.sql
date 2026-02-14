INSERT INTO users (name, email, password_hash, role)
VALUES (
  'Admin',
  'admin@app.com',
  '$2b$10$G3ZgrsDW67rdiiROFpBxbec04FN0SJ06ps6Ddrg/CwwgE1kObPWSC', -- hash for "Admin123!"
  'admin'
);

const bcrypt = require("bcryptjs");

const hash = "$2b$10$UFZern1gMTey2MRDsjrgre9QIyP0/Cu5XACkb7B8WZ3p8.Mejm6uu";

bcrypt.compare("Admin123!", hash).then(console.log);
