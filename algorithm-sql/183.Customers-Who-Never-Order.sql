-- 83.从不订购的客户
-- SQL 架构

-- 某网站包含两个表，Customers 表和 Orders 表。
-- 编写一个 SQL 查询，找出所有从不订购任何东西的客户。
-- Customers 表：
-- +----+-------+
-- | Id | Name  |
-- +----+-------+
-- | 1  | Joe   |
-- | 2  | Henry |
-- | 3  | Sam   |
-- | 4  | Max   |
-- +----+-------+
-- Orders 表：
-- +----+------------+
-- | Id | CustomerId |
-- +----+------------+
-- | 1  | 3          |
-- | 2  | 1          |
-- +----+------------+
-- 例如给定上述表格，你的查询应返回：
-- +-----------+
-- | Customers |
-- +-----------+
-- | Henry     |
-- | Max       |
-- +-----------+


-- 方法一：
-- 思路 ：先找出订购商品的客户的Id
-- （生成一个临时表，此处必须使用Id，不能使用Name，因为Name可能出现重复），
-- 然后再找出Customers中Id不属于前一个临时表中Id的所有Id。
SELECT
  Customers.Name AS Customers
FROM
  Customers
WHERE
  Customers.Id NOT IN (
    SELECT
      Customers.Id
    FROM
      Customers,
      Orders
    WHERE
      Customers.Id = Orders.CustomerId
  );

-- 方法二 ： 
-- 方法一自己想的，很笨，还有更简单的，
-- 思路差不多，只是直接使用Orders表获取购买物品的客户的Id，
-- 不用去判断Id与CustomerId是否相等 。
SELECT
  Customers.Name AS Customers
FROM
  Customers
WHERE
  Customers.Id NOT IN (
    SELECT
      CustomerId
    FROM
      Orders
  );