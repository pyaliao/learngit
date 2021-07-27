CREATE TABLE IF NOT EXISTS `Salary` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `Salary` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  Employee (Salary)
VALUES
  (100);

INSERT INTO
  Employee (Salary)
VALUES
  (200);

INSERT INTO
  Employee (Salary)
VALUES
  (300);

ALTER TABLE
  employee RENAME TO Employee;

SELECT
  Salary AS SecondHighestSalary
FROM
  Employee
ORDER BY
  Salary DESC
LIMIT
  1 OFFSET 1;