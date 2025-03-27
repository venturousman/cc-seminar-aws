# Requirements
## Deploy an RDS MySQL Instance (SQL)
* Create an RDS MySQL instance.
* Create an EC2 instance in the same VPC.
* Install MySQL Shell in EC2: sudo dnf install mariadb105
- Check if MySql Shell is installed successfully: mysql --verion
* Connect to MySQL from EC2 using MySQL CLI: mysql -h your-rds-endpoint -u admin -p
* Run the following commands in MySQL Shell:
```
CREATE DATABASE company;
USE company;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    age INT
);

INSERT INTO users (name, email, age) VALUES
('Alice', 'alice@example.com', 25),
('Bob', 'bob@example.com', 30);

SELECT * FROM users;
```
## Deploy a DocumentDB Instance (NoSQL)
* Launch Amazon DocumentDB.
* Create an EC2 instance in the same VPC.
* Install MongoDB Shell in EC2: 
- Create a /etc/yum.repos.d/mongodb-org-8.0.repo file so that you can install MongoDB directly using yum:
```
[mongodb-org-8.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/8.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://pgp.mongodb.com/server-8.0.asc
```
- To install mongodb, run this command: sudo yum install -y mongodb-org
- Check version: mongosh --version
* Follow the guide in DocumentDB to connect with this database from EC2
* Run the following commands to test:
```
use mydb
db.students.insert({name: "Peter", id: "S1000"})
db.students.find()
```
## Submit screenshots demonstrating:
* RDS MySQL Queries (User table, Join results).
* DocumentDB MongoDB Queries (Users and nested orders).
