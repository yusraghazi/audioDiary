-- insert into audio_user values (10002,'1980-01-01','Koos');
-- insert into audio_user values (10001,'1980-01-01','Jan-Pieter');

-- insert into posts (id, title, description, img, theme, is_liked, user_id, audio) VALUES (1, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                    'SUN', true, 10001, 20000);
-- insert into posts (id, title, description, img, theme, is_liked, user_id) VALUES (2, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                                                                          'SUN', true, 10001);
-- insert into posts (id, title, description, img, theme, is_liked, user_id) VALUES (3, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                                                                          'SUN', true, 10002);
-- insert into posts (id, title, description, img, theme, is_liked, user_id) VALUES (4, 'Bird sounds', 'The birds singing at Amsterdamsche Bos', 'amazon.jpg',
--                                                                          'SUN', true, 10002);
-- insert into audio_user (id, name, username, email, password, password_reset, is_admin, is_verified) VALUES (1, 'name', 'hallo', 'email', 'password', 'passwordreset', true, false);

insert into audio_user (email, admin, encoded_password, is_verified, name, password_reset, username) VALUES
('hanna.toenbreker@hva.nl', false, 'hallo', true, '452c6c01de131b359302c414ab549f6f9ea495b69025c3b4c6cbeb9affc69783', 'passwordreset', 'htoenbreker');

insert into audio (id, description, duration, filename, location, user_email)
VALUES (2, 'hallo', 2.34, 'hi', 2000291, 'hanna.toenbreker@hva.nl');
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (4, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'amazon.jpg', true, 'Theme.SUN', 'River Sounds', 2, 'hanna.toenbreker@hva.nl');
insert into comment(id, description, post_id, user_email) VALUES (1, 'nice audio!', 4, 'hanna.toenbreker@hva.nl');

insert into likes (id, post_id, user_email) VALUES (1, 4, 'hanna.toenbreker@hva.nl');

insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'river.jpg', true, 'Theme.SUN', 'River Sounds', 2, 'hanna.toenbreker@hva.nl');
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (2, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'amazon.jpg', true, 'Theme.FOREST', 'Amazon Birds', 2, 'hanna.toenbreker@hva.nl');
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (3, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'seawaves.jpg', true, 'Theme.WATER', 'Sound of Waves', 2, 'hanna.toenbreker@hva.nl');
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (5, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'river.jpg', true, 'Theme.SUN', 'River Sounds', 2, 'hanna.toenbreker@hva.nl');
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (6, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'amazon.jpg', true, 'Theme.FOREST', 'Amazon Birds', 2, 'hanna.toenbreker@hva.nl');
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (7, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'seawaves.jpg', true, 'Theme.WATER', 'Sound of Waves', 2, 'hanna.toenbreker@hva.nl');
insert into posts (id, amount_report, description, img, is_liked, theme, title, audio_id, user_email)
VALUES (8, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'seawaves.jpg', true, 'Theme.WATER', 'Sound of Waves', 2, 'hanna.toenbreker@hva.nl');
