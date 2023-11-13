# Учебный проект интернет-магазина на базе Google Books Api.

**В рамках проекта было необходимо**:

1. Сверстать главную страницу интернет-магазина Bookshop.
2. Подключить Google Books API так, чтобы данные о книгах подгружались с сервера.
3. Подключить созданный ранее слайдер.
4. Поработать над правильной организацией проекта:
  - реализовать модульную структуру;
  - подключить Webpack;
  - настроить сборку с минификацией.
5. Применить пройденные вами ранее инструменты оптимизации.

# Сборка проекта

## Установить зависимости:
```
npm i
```
## Скомпилировать js и scss:
```
npm run build
```
## Запуск dev-сервера
```
npm run dev
```

# ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ К ПРОЕКТУ
## Шапка сайта
Шапка содержит логотип, навигацию и набор кнопок. Ссылки в меню можно оставить пустыми, так как реализация остальных страниц сайта в проекте не предусмотрена.

Кнопки авторизации, поиска и корзины неактивны. Однако при добавлении товара в корзину у иконки должен появиться бейджик с количеством товара в корзине.

При прокрутке сайта шапка должна оставаться закреплённой в верхней части экрана.

## Слайдер
Под шапкой сайта располагается слайдер.

Слайдер автоматически пролистывает изображения каждые 5 секунд, а после последнего изображения вновь переключается на первое. Перелистывать изображения можно также с помощью точек под слайдером.

Справа от слайдера располагаются цветные блоки. Их нужно сверстать как ссылки, адреса ссылок можно оставить пустыми.

## Список категорий и список книг
Под слайдером в левой части экрана располагается список категорий. Активная категория должна быть выделена визуально.

По умолчанию в качестве активной выбрана первая категория в списке. Клик на неактивную категорию делает её активной, и список книг перезагружается, чтобы отобразить книги из этой категории.

Список книг подгружается из Google Books API в соответствии с выбранной категорией. Для списка книг необходимо реализовать ленивую загрузку: сначала подгружаются первые 6 книг, по клику на кнопку «Load more» — ещё 6, и так далее.

## Карточка книги
В карточке книги должна быть отображена следующая информация:

Обложка. Если API не возвращает обложку, подставить вместо неё любую картинку-плейсхолдер. Автор. Если авторов несколько, перечислить их через запятую. Заголовок. Рейтинг: от 1 до 5 звёздочек плюс общее количество отзывов. Если в данных о книге нет рейтинга, не показывать эту строчку. Описание. Если текст в описании занимает больше 3-х строк, его нужно обрезать и добавить в конце многоточие. Цена с указанием валюты. Если в данных о книге нет цены, не показывать эту строчку. Ниже приведён пример карточки товара, а также названия свойств в объекте книги, которые содержат необходимую информацию:

Под описанием каждой книги должна быть кнопка «Buy now». При клике на неё товар добавляется в корзину, а кнопка меняет внешний вид. При повторном нажатии на кнопку товар убирается из корзины.

Информация о книгах, добавленных в корзину, должна сохраняться в localStorage.
