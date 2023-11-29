[<p align="center"><img src="https://github.com/thevladbog/Grimoire/blob/main/www-grimoire/src/assets/img/Grimoire_README_logo.png?raw=true" title="Grimoire Logo" /></p>]()

***
# [Frontend] Grimoire | HR System
[![Frontend - Tests on PR](https://github.com/thevladbog/Grimoire/actions/workflows/FrontendTests.yml/badge.svg)](https://github.com/thevladbog/Grimoire/actions/workflows/FrontendTests.yml)
[![Vercel](https://vercelbadge.vercel.app/api/thevladbog/grimoire)](https://grimoire.v-b.tech/)
[![Checkly](https://api.checklyhq.com/v1/badges/checks/74de1542-cd40-4622-ae21-2e5a5e821b90)](https://grimoire.checkly-dashboards.com/)
[![CodeQL](https://github.com/thevladbog/Grimoire/actions/workflows/codeql.yml/badge.svg)](https://github.com/thevladbog/Grimoire/actions/workflows/codeql.yml)
[![Dependency Review](https://github.com/thevladbog/Grimoire/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/thevladbog/Grimoire/actions/workflows/dependency-review.yml)
[![codecov](https://codecov.io/gh/thevladbog/Grimoire/graph/badge.svg?token=NVIXEWXPT9)](https://codecov.io/gh/thevladbog/Grimoire)
***
TEST
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
Если у вас есть дополнительные идеи - создавай их в [Issue](https://github.com/thevladbog/Grimoire/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title=%5BIDEA%5D) 


## Пример дизайна (будет обновляться)

![](https://github.com/thevladbog/Grimoire/blob/main/www-grimoire/src/assets/img/Grimoire_Example.png?raw=true)
