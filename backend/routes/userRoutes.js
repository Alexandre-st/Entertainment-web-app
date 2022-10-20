import express from 'express';
const router = express.router();

import { registerUser } from '../controllers';

router.post('/', registerUser);

export default router;