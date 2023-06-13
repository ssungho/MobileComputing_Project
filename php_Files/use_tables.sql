// use tables

// user_accounts
create table user_accounts(

    no bigint(100) unsigned not null auto_increment,
    name varchar(50) not null,
    email varchar(50) not null,
    password varchar(50) not null,
    gender varchar(50) not null,
    primary key (no)

)  DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

// user_post
CREATE TABLE user_post
(
	id INT AUTO_INCREMENT PRIMARY KEY,

	title varchar(255) not null,
	store_name varchar(255) not null,
	description varchar(255) not null,
	numberOfPeople varchar(255) not null,
	date date not null,
    currPeople int(10) DEFAULT 1

) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;