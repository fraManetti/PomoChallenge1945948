WITH mieiAmici AS (
  SELECT utentea AS amico FROM amici WHERE utenteb = 'luca'
  UNION
  SELECT utenteb AS amico FROM amici WHERE utentea = 'luca'
)
SELECT *
FROM (
  SELECT utentea FROM mieiAmici JOIN amici ON (utenteb = amico) WHERE utentea != 'luca'
  UNION
  SELECT utenteb FROM mieiAmici JOIN amici ON (utentea = amico) WHERE utentea != 'luca'
) AS pippo
ORDER BY random()
LIMIT 3;