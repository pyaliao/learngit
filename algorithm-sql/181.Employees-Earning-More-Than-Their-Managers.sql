-- 181.超过经理收入的员工
-- SQL 架构

-- Employee 表包含所有员工，他们的经理也属于员工。
-- 每个员工都有一个 Id，此外还有一列对应员工的经理的 Id。
-- +----+-------+--------+-----------+
-- | Id | Name  | Salary | ManagerId |
-- +----+-------+--------+-----------+
-- | 1  | Joe   | 70000  | 3         |
-- | 2  | Henry | 80000  | 4         |
-- | 3  | Sam   | 60000  | NULL      |
-- | 4  | Max   | 90000  | NULL      |
-- +----+-------+--------+-----------+
-- 给定 Employee 表，编写一个 SQL 查询，该查询可以获取收入超过他们经理的员工的姓名。
-- 在上面的表格中，Joe 是唯一一个收入超过他的经理的员工。
-- +----------+
-- | Employee |
-- +----------+
-- | Joe      |
-- +----------+

--- 方法一
SELECT
  EmpyOne.Name AS Employee
FROM
  Employee AS EmpyOne,
  Employee AS EmpyTwo
WHERE
  EmpyOne.ManagerId = EmpyTwo.Id
  AND EmpyOne.Salary > EmpyTwo.Salary;
  
--- 方法二
SELECT
  EmpyOne.Name AS Employee
FROM
  Employee AS EmpyOne
  INNER JOIN 
  Employee AS EmpyTwo 
  ON EmpyOne.ManagerId = EmpyTwo.Id 
  AND EmpyOne.Salary > EmpyTwo.Salary;