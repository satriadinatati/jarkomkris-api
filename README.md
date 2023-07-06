# backend-jakomkris
 Backend Aplikasi Peta Gereja Tangguh Bencana JaKomKris

 Pre-requirement:
  Currently, we need to manually run each file located in preload-data folder sequentially. Example:
 ```
 node preload-data/1-insert-article.js
 ctrl + c
 ```

 How to:
 ```
 npm install
 npm start
 ```

 File .env configuration:
 ```
 PTB_DATABASE_URL = mongodb://DB_ENDPOINT:27017/
 or
 PTB_DATABASE_URL = mongodb+srv://USERNAME:PASSWORD@CLUSTER_ENDPOINT/
 ```
 ```
 PTB_DATABASE = peta_gereja_tangguh_bencana
 PTB_IMAGE_BUCKET = images

 PTB_BASE_URL = http://SERVER_URL:8080
 PTB_DEFAULT_CHURCH_IMAGE_URL = ANY_IMAGE_URL_OR_PATH
 ```

 Browse:
 ```
 http://SERVER_URL:8080
 ```
