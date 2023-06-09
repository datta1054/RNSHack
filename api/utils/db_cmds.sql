use db;
select * from users;
-- the users table was generated using GUI
SELECT DATA_TYPE from INFORMATION_SCHEMA. COLUMNS where table_schema = 'db' and table_name = 'users';
SHOW FIELDS FROM users;

create table expenses (
	ExpenseNumberID varchar(255) primary key ,
    amount bigint default 0,
    category varchar(255),
    curr_date date,
      user_email VARCHAR(255),
     FOREIGN KEY (user_email) REFERENCES users(email)
);
CREATE TABLE incomes (
    IncomeNumberId VARCHAR(255) PRIMARY KEY,
    income BIGINT,
    description VARCHAR(255),
    date DATE,
    user_email VARCHAR(255),
    FOREIGN KEY (user_email) REFERENCES users(email)
);

select * from incomes;


create table budget (
	BudgetNumberID varchar(255) primary key ,
    amount bigint default 0,
    category varchar(255),
    curr_date date,
	user_email VARCHAR(255),
	FOREIGN KEY (user_email) REFERENCES users(email)
);

