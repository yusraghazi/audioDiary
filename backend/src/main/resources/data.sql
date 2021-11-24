-- insert into user values (10002,'1980-01-01','Koos');
-- insert into user values (10001,'1980-01-01','Jan-Pieter');

-- insert into posts (id, title, description, img, theme, is_liked, user_id, audio) VALUES (1, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                    'SUN', true, 10001, 20000);
-- insert into posts (id, title, description, img, theme, is_liked, user_id) VALUES (2, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                                                                          'SUN', true, 10001);
-- insert into posts (id, title, description, img, theme, is_liked, user_id) VALUES (3, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                                                                          'SUN', true, 10002);
-- insert into posts (id, title, description, img, theme, is_liked, user_id) VALUES (4, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                                                                          'SUN', true, 10002);
insert into user (id, name, username, email, password, password_reset, is_admin, is_verified) VALUES (1, 'name', 'hallo', 'email', 'password', 'passwordreset', true, false);
insert into audio (id, description, duration, filename, location, user_id)
VALUES (2, 'hallo', 2.34, 'hi', 2000291, 1);
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id)
VALUES (4, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'amazon.jpg', true, 'Theme.SUN', 'River Sounds', 2, 1);
insert into comment(id, description, post_id, user_id) VALUES (1, 'blabliep', 4, 1);
insert into likes (id, post_id, user_id) VALUES (1, 4, 1);

insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id)
VALUES (1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'river.jpg', true, 'Theme.SUN', 'River Sounds', 2, 1);
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id)
VALUES (2, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'amazon.jpg', true, 'Theme.FOREST', 'Amazon Birds', 2, 1);
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id)
VALUES (3, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'seawaves.jpg', true, 'Theme.WATER', 'Sound of Waves', 2, 1);
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id)
VALUES (5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'river.jpg', true, 'Theme.SUN', 'River Sounds', 2, 1);
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id)
VALUES (6, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'amazon.jpg', true, 'Theme.FOREST', 'Amazon Birds', 2, 1);
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_id)
VALUES (7, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'seawaves.jpg', true, 'Theme.WATER', 'Sound of Waves', 2, 1);
