-- 182.查找重复的电子邮箱
-- SQL 架构

-- 编写一个 SQL 查询，查找 Person 表中所有重复的电子邮箱。
-- 示例：
-- +----+---------+
-- | Id | Email   |
-- +----+---------+
-- | 1  | a@b.com |
-- | 2  | c@d.com |
-- | 3  | a@b.com |
-- +----+---------+
-- 根据以上输入，你的查询应返回以下结果：
-- +---------+
-- | Email   |
-- +---------+
-- | a@b.com |
-- +---------+
-- 说明：所有电子邮箱都是小写字母。

-- 方法一：

SELECT
  DISTINCT Email
FROM
  Person
GROUP BY
  Email
HAVING
  COUNT(Id) > 1;

-- 方法二：
思路：
先计算邮箱重复的次数：
SELECT Email, COUNT(Email) AS num FROM Person GROUP BY Email;
然后将此结果作为临时表，根据重复次数进行过滤
SELECT
  Email
FROM
  (
    SELECT
      Email,
      COUNT(Email) AS num
    FROM
      Person
    GROUP BY
      Email
  ) AS statistic
WHERE
  num > 1;

-- 创建本地测试数据库表并插入数据
-- CREATE TABLE Person (
--   Id INT UNSIGNED AUTO_INCREMENT,
--   Email VARCHAR(40) NOT NULL,
--   PRIMARY KEY (Id)
-- ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- INSERT INTO Person (Id, Email)
-- VALUES
--   (1, 'a@b.com'),
--   (2, 'c@d.com'),
--   (3, 'a@b.com');