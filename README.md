# Megaplan for InSales

Приложение осуществляет одностороннюю интеграцию CMS InSales с Megaplan. Функционал обеспечивает автоматическую отправку заказов в CRM. Этот проект был создан для демонстрации моих знаний и умений, как Frontend разработчика.

Интерфейс личного кабинета можно посмотреть [здесь](https://megaplan-for-insales.cf/account/?shop=myshop-qv77.myinsales.ru&insales_id=571657)


Для реализации этого проекта я использовал:
* [Meteor](https://www.meteor.com/) - Backend
* [React](https://reactjs.org/) - Frontend
* [Meteor Up](http://meteor-up.com/) - Deploy
* [MongoDB](https://github.com/jsmarkus/the-little-mongodb-book/blob/master/ru/mongodb.markdown)
* [ES6](https://learn.javascript.ru/js)
* CSS3 + HTML5 - [Мой аккаунт на HtmlAcademy](https://htmlacademy.ru/profile/id817935/progress)
* [InSales REST API](https://api.insales.ru/)
* [Megaplan REST API](https://dev.megaplan.ru/api/index.html)
* [Обертка Megaplan REST API](https://github.com/zxqfox/megaplanjs) - доработана в процессе разработки
* [Trello](https://trello.com/) - управление проектом
* [WebStorm](https://www.jetbrains.com/webstorm/) - среда разработки


## Приступая к работе
Эти инструкции помогут вам запустить копию проекта для разработки/тестирования на вашей локальной машине.

### Предварительные условия
Установите
* npm
* [Meteor](https://www.meteor.com/install)

### Установка
Скопируйте репозиторий проекта
```
git clone https://github.com/alexeyBityukov/megaplanForInSales.git
```
Установите зависимости
```
npm install
```
Отлично! Приложение готово к запуску!
## Запуск приложения
Для запуска проекта в директории проекта запустите команду
```
meteor
```

## Запуск тестов
Раздел в разработке

## Развертывание приложения
Для развертывания проекта на сервере я использовал Meteor Up. Подробные инструкции по развертыванию приложения доступны на сайте
* [Meteor Up](http://meteor-up.com/getting-started.html)

ВАЖНО: для корректной работы приложения не забудьте настроить SSL сертификат.

Так же необходимо создать аккаунт в CMS InSales. Затем создать приложение в разделе Приложения -> Разработчикам -> Добавить приложение, после чего значения полей "Идентификатор" и "Секрет" сохранить в фале config.js. В технических параметрах приложения необходимо прописать:
* URL установки - https://your-domen/api/install
* URL входа - https://your-domen/account
* URL деинсталяции - https://your-domen/api/remove

## Автор
* **[Битюков Алексей](https://github.com/alexeyBityukov)** - *Создатель* - alex.bityuckov@gmail.com
