create database Instagram;
create table User(id numeric(5) PRIMARY KEY,age numeric(5) CHECK(age>=18),name varchar(10) NOT NULL,email varchar(50),followers numeric(20) default 0,following numeric(20));
drop table User;
use instagram;

insert into User values(1,19,"ninad","njj@gmail.com",123,12),(2,20,"sanket","sanket@gmail.com",183,62),(3,22,"pavan","pavan123@gmail.com",623,129);

select * from User;



create table Posts(id numeric(5) NOT NULL,content varchar(50),user_id numeric(5),foreign key(user_id) references User(id));
insert into Posts values(101,"hello connections",3),(102,"Master vijay",1);
select * from Posts;

use instagram;
select id,name from User where followers>150;
select * from User where following>100;
select id,name,followers from User order by followers ASC;
select id,name,followers from User order by followers desc;
select max(followers) from User;
select sum(followers) from User;
select min(age) from User;
select count(followers) from User;

update User
set followers=500
where age=19;



delete from User where age=20;

set sql_safe_updates=0;

desc User;