SalesBoard:
    SalesBoard is a simple and intuitive dashboard that helps you manage and track your product sales. Add the products you sell, monitor how many items have been sold, and keep an accurate record of your daily revenue. 

how to work :
clone the repository
npm install
create .env :
                    DB_HOST
                    DB_USER
                    DB_PASSWORD
                    DB_NAME

create table with this commande:
    npx tsx src/app/api/Migrations/createProductTable.ts

then Run the server:
    npm run dev
