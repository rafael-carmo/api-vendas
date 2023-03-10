import 'reflect-metadata';
import { app } from '@shared/infra/http/app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  const server = app.listen(3333, () => {
    return console.log('Server started on port 3333!');
  });
});
