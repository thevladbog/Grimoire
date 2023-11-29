[![](https://github.com/thevladbog/Grimoire/blob/main/www-grimoire/src/assets/img/Grimoire_README_logo.png?raw=true)]()
***
# Grimoire | HR System
[![Frontend - Tests on PR](https://github.com/thevladbog/Grimoire/actions/workflows/FrontendTests.yml/badge.svg)](https://github.com/thevladbog/Grimoire/actions/workflows/FrontendTests.yml)
![Vercel](https://vercelbadge.vercel.app/api/thevladbog/grimoire)
***

## About
Система предназначена для контроля выхода новых сотрудников в компанию. Охватывает путь от заведения заявки рекрутером на выход до самого выхода в компанию.

### Основные этапы

- рекрутер заводит заявку, в которой указывает:

    - ФИО нового сотрудника;
    - контактный адрес электронной почты;
    - выбранная конфигурация оборудования;
    - ФИО будущего руководителя;
    - необходимые доступы, возможные к выдаче в первый рабочий день;
    - дата выхода;
- будущий сотрудник получает ссылку на заполнение полной анкеты о себе (ФИО, данные документов, их сканы и т.д.)%
- в Service Desk формируется заявка на создание корпоративной учетной записи. Итог: в систему внесены корректыне данные (логин, корпоративная почта, ФИО, домен);
- после: формируется заявка в Service Desk на подготовку оборудования;
- в Service Desk формируются отдельные заявки на получение доступов (один доступ - одна заявка);
- коллеги из кадрового администрирования имеют доступ к полным данным нового сотрудника;
- в день выхода коллеги из Service Desk отмечают выход сотрудника в компанию.

## To-Do

Бэклог проека ведется и наполняется в [[Grimoire] Project](https://github.com/users/thevladbog/projects/2/views/1).
Если у вас есть дополнительные идеи - создавай их в [Issue](https://github.com/thevladbog/Grimoire/issues/new?assignees=&labels=&projects=&template=feature_request.md&title=)


## Пример дизайна (будет обновляться)

![](https://github.com/thevladbog/Grimoire/blob/main/www-grimoire/src/assets/img/Grimoire_Example.png?raw=true)
