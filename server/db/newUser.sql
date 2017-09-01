INSERT INTO Users
(un, pw)
VALUES
($1, $2)
RETURNING *;
-- SELECT id FROM Users
-- WHERE un = $1 AND pw = $2;