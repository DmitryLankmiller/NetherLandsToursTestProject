# Tour Crawler

## Prerequisites

Перед началом работы убедитесь, что у вас установлены:

- **Node.js** версии 16.0 или выше
- **NPM** (Node Package Manager)

## Установка и запуск

1. Клонируйте репозиторий:

   ```
   git clone https://github.com/DmitryLankmiller/NetherLandsToursTestProject.git
   ```

2. Перейдите в директорию проекта:

   ```
   cd NetherLandsToursTestProject/tour-crawler/
   ```

3. Установите зависимости:

   ```
   npm i
   ```

4. Запустите проект:
   ```
   npm start
   ```

## Результаты

После завершения выполнения процесса в консоли, результат будет доступен по пути: <code>./storage/datasets/default</code>

## Добавление прокси

Чтобы добавить новый прокси, откройте файл `./src/proxy.js` и добавьте URL прокси в массив `availableProxyUrls` по примеру уже существующих записей:

## Конфигурация

Чтобы запускать браузер в headless режиме или изменить уровень логирования необходимо изменить соответствующие значения в `./crawlee.json`
