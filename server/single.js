import express, { Router } from 'express';
import { index } from './controllers/readSingle';

const single = Router();
single.route('/single.json')
  .get(index);
  
export default single;