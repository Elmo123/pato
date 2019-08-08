import express, { Router } from 'express';
import { index } from './controllers/readData';

// Initialize the router
const router = Router();
router.route('/data.json')
  .get(index);
  
export default router;