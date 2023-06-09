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