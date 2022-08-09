import * as functions from 'firebase-functions';
import * as jsonServer from 'json-server';
import cors from 'cors';

const main = jsonServer.create();
const app = jsonServer.create();
const router = jsonServer.router('db.json', {
  foreignKeySuffix: '_id',
});
const middlewares = jsonServer.defaults({
  noCors: true,
});

app.use(middlewares);
app.use(cors({origin: true}));
app.use(router);
app.listen(3000);

main.use('/', app);

export const api = functions.https.onRequest(main);
