use db;
select * from users;
-- the users table was generated using GUI
create table expenses (
	ExpenseNumberID varchar(255) primary key ,
    amount bigint default 0,
    category varchar(255),
    curr_date date,
      user_email VARCHAR(255),
     FOREIGN KEY (user_email) REFERENCES users(email)
);