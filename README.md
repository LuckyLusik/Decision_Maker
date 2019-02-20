# Decision Maker
Decision Maker is a simple web tool to help to make a decision via a quick shareable poll. Once the poll questions and poll close time is completed in the form, you will receive an email with poll access information you can share with anyone you want to poll.

## Getting Started

1. Install dependencies (using the npm install command).
2. Run the web server by using the npm run local.
3. Connect to the server through localhost:8080.

## Dependencies

- Body-Parser: ^1.15.2,
- dotenv: ^2.0.0,
- ejs: ^2.4.1,
- Express: ^4.13.4,
- Knex: ^0.11.10,
- Knex-logger: ^0.1.0,
- Moment: ^2.23.0,
- Morgan: ^1.7.0,
- Node-Sass-Middleware: ^0.11.0,
- Nodemailer: ^4.7.0,
- PostgresSQL: ^6.4.2,
- Randomstring: ^1.1.5
- Nodemon: ^1.9.2

## Final Product

On connection: 

![On connection](https://github.com/LuckyLusik/Decision_Maker/blob/master/docs/landing_page.png)


You need to fill out the form in order to create a poll. You can add and remove new choices. After submition you have a link to a voting page.

![Poll page](https://github.com/LuckyLusik/Decision_Maker/blob/master/docs/poll_full.gif)


You have to make a decision and rank those choices. So it means you cannot give the same amount of stars to different choices. Before submiting your votes you can change your mind and clear your ranking.

![Voting page](https://github.com/LuckyLusik/Decision_Maker/blob/master/docs/voting_can.gif)


After submiting your votes you can see the results of the poll:

![Voting page](https://github.com/LuckyLusik/Decision_Maker/blob/master/docs/results_full.gif)
