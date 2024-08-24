CREATE DATABASE chatbot_faq;
USE chatbot_faq; 

create table faq_categories(
id INT auto_increment primary key, 
category_name varchar(255) not null
);

create table faq_questions(
id INT auto_increment primary key,
category_id int, 
question_text varchar(255) not null, 
answer_text text, 
foreign key (category_id) references faq_categories(id)
);

INSERT INTO faq_categories (category_name) VALUES
('Serviço'),
('Preços'),
('Suporte Técnico');

INSERT INTO faq_questions (category_id, question_text, answer_text) VALUES
(1, 'Quais serviços vocês oferecem?', 'Oferecemos serviços de fotografia para eventos, ensaios fotográficos, e design de interiores.'),
(1, 'Como posso agendar um serviço?', 'Você pode agendar um serviço entrando em contato conosco pelo telefone ou e-mail fornecidos em nosso site.'),
(2, 'Qual é o custo de uma sessão de fotos?', 'O custo de uma sessão de fotos varia de acordo com o tipo de serviço e a duração. Entre em contato para um orçamento personalizado.'),
(2, 'Vocês oferecem pacotes promocionais?', 'Sim, oferecemos pacotes promocionais em determinados períodos do ano. Consulte nosso site ou entre em contato para mais informações.'),
(3, 'Como posso entrar em contato com o suporte técnico?', 'Você pode entrar em contato com o suporte técnico através do nosso e-mail de suporte ou pelo telefone disponível em nosso site.'),
(3, 'Quais são os horários de atendimento do suporte?', 'O suporte técnico está disponível de segunda a sexta-feira, das 9h às 18h.');

SHOW TABLES;

SELECT * FROM faq_categories;
SELECT * FROM faq_questions;
