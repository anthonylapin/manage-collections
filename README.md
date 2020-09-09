# Manage Collections

## Itransition final project

### EN

It is required to develop a site for managing personal collections (books, stamps, badges, whiskey, etc. - hereinafter in the text, what the collection consists of is called items).

Only read-only mode is available to unauthenticated users (search is available, creation of collectibles and items is not available, comments and likes are not available).

Authenticated users have access to everything except the admin area.

The admin panel allows you to manage users (view, block, delete, assign others as admins). The administrator sees each user page and each collection as its creator-owner (for example, he can edit or create a new collection on behalf of the user from his page, or add an item, etc.). Explanation: there is no need to make separate views for the admin (except for the "admin panel", of course).

Only the owner or admin can manage the collection (edit / add / delete).

Social media login required (at least two).

Full-text site search is available on each page (search results are always items, for example, if the text is found in the description of the collection or comments, which should be possible, then a link to the item is displayed). Display for search results - items.

Each user has his personal page, on which he manages the list of his collections (you can add, delete or edit) and from which you can go to the collection page (there is a table with filters and sorts, the ability to create / delete / edit an item).

Each collection consists of: a name, a short description with support for markdown formatting, a "theme" (from a fixed set, for example, "Alcohol", "Books", etc.), an optional image (stored in the cloud, loaded by drag-n-drop- ohm). In addition, the collection has the ability to specify the fields that each item in it will have (there are fixed fields - id, name and tags, you can "add-include" some of the following - three numeric fields, three one-line fields, three text fields, three dates, three boolean checkboxes). For example, you can specify that in my collection of books each item has (in addition to id, title and tags) a string field "Author", a text field "Comment", a date field "Year of publication". The text field is a field with markdown formatting. The fields are characterized by a name. Fields are displayed in the list of items - the list requires support for switchable sorts and filters. Explanation: all items in the database have all possible fields at once and there is one more additional field (for example, a bit mask) that specifies which fields are displayed.

Each item has tags (several tags are entered, autocompletion is required - when the user starts to enter a tag, a list with variants of words that have already been entered on the site appears)

The main page displays: the last added items, collections with the largest number of items, a tag cloud (when clicked, the result is a list of links to items, similar to the search results, in fact it can be one view).

When opening an item in read mode by the author or just other users, comments are displayed at the end. Comments are linear, you cannot comment on comments, a new one is added only "in the tail". It is necessary to implement automatic loading of comments - if I have a page with comments open and someone else adds a new one, it automatically appears for me (there may be a delay of 2-5 seconds).

The item must have likes (no more than one from one user per item).

The site must support two languages: Russian and English (the user selects and the choice is saved). The site must support two designs (themes): light and dark (the user selects and the choice is saved).

Required: Bootstrap (or any other CSS framework), support for different resolutions (including phone), ORM for data access (Hibernate, EF, whatever), a full-text search engine (or by means of a database, or a separate engine - NOT FULL SCAN with select).

Requirements with an asterisk (only optional, by 10/10, after the implementation of the remaining requirements):
* Add the ability to fields in items that are "select from the list", with the ability to set values.

* Add the ability to support an arbitrary number of custom fields, and not three of one of the five types.

* Add the ability to export a collection to a CSV file.

*** Add a selling mechanism - virtual wallets, users, replenishment of wallets, prices, listing for sale, buying ads on the home page.


### RU

Требуется разработать сайт для управления личными коллекциями (книги, марки, значки, виски, etc. — далее в тексте то, из чего состоит коллекция, называется айтемами).

Неаутентифицированным пользователи доступен только режим read-only (доступен поиск, недоступно создание коллекий и айтемов, недоступны комментарии и лайки).

Аутентифицированные пользователи имеют доступ ко всему, кроме админки.

Админка позволяет управлять пользователями (просматривать, блокировать, удалять, назначать других админами). Администратор видит каждую страницу пользователя и каждую коллекцию как ее создатель-владелей (например, может отредактировать или создать от имени пользователя с его страницы новую коллекцию или добавить айтем и т.п.). Пояснение: для админа не нужно делать отдельные вьюшки (кроме "админки", конечно).

Только владелец или админ может управлять коллекцией (редактировать/добавлять/удалять).

Требуется поддерживать вход через социальные сети (не менее двух).

На каждой странице доступен полнотекстовый поиск по сайту (результаты поиска - всегда айтемы, например, если текст найден в описании коллекции или комментарии, что должно быть возможно, то выводится ссылка на айтем). Отображение для результатов поиска — айтемы.

У каждого пользователя есть его личная страница, на которой он управляет списком своих коллекий (можно добавить, удалить или отредактировать) и из которой можно перейти на страницу коллекции (там таблица с фильтраций и сортировками, возможность создать/удалить/редактировать айтем).

Каждая коллекцяя состоит из: название, краткое описание с поддержкой форматирования markdown, "тема" (из фиксированного набора, например, "Alcohol", "Books" и проч.), опционального изображения (хранится в облаке, загружается drag-n-drop-ом). Помимо этого, у коллекции есть возможность указать поля, которые будут у каждого айтема в ней (есть фиксированные поля - id, название и тэги, можно "добавить-включить" некоторые из следующих - три числовых поля, три однострочных поля, три текстовых поля, три даты, три булевских чек-бокса). Например, можно указать, что в моей коллекции книг у каждого айтема есть (помимо id, названия и тэгов) строковое поле "Автор", текстовое поле "Комментарий", поле-дата "Год издания". Текстовое поле — поле с форматирование markdown. Поля характиризуются названием. Поля отображаются в списке айтемов - в списке необходима поддержка переключающихся сортировок и фильтров. Пояснение: у всех айтемов в базе сразу есть все возможные поля и есть еще одно дополнительное поле (например, битовая маска), которое задаёт, какие поля отображаются.

Каждый айтем имеет тэги (вводится несколько тэгов, необходимо автодополнение - когда пользователь начинает вводить тэг, выпадает список с вариантами слов, которые уже вводились ранее на сайте)

На главной странице отображаются: последние добавленные айтемы, коллекции с самым большим числом айтемов, облако тэгов (при клике результат - список ссылок на айтемы, аналогично результатам поиска, по сути это может быть одна вьюшка).

При открытии айтема в режиме чтения автором или просто другими пользователями, в конце отображаются комментарии. Комментарии линейные, нельзя комментировать комментариий, новый добавляется только "в хвост". Необходимо реализовать автоматическую подгрузку комментариев - если у меня открыта страница с комментариями и кто-то другой добавляет новый, он у меня автомагически появляется (возможна задержка в 2-5 секунд).

У айтема должны быть лайки (не более одного от одного пользователя на айтем).

Сайт должен поддерживать два языка: русский и английский (пользователь выбирает и выбор сохраняется). Сайт должен поддерживать два оформления (темы): светлое и темное (пользователь выбирает и выбор сохраняется).

Обязательно: Bootstrap (или любой другой CSS-фреймворк), поддержка разных разрешений (в том числе телефон), ORM для доступа к данным (Hibernate, EF, что угодно), движок для полнотекстового поиск (или средствами базы, или отдельный движок — НЕ ПОЛНОЕ СКАНИРОВАНИЕ селектами).

Требования со звездочкой (лишь опционально, на 10/10, после реализации остальных требований):
* Добавить возможность полей в айтемах, которые являются "выбором из списка", с возможностью задания значений.

* Добавить возможность поддержки произвольного числа кастомных полей, а не по три одного из пяти видов.

* Добавить возможность экспорта коллекции в CSV-файл.

*** Добавить механизм продажи - виртуальные кошельки, пользователей, пополнение кошельков, цены, выставление на продажу, покупка рекламы на главной странице.
