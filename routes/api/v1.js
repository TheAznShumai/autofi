import express from 'express';
import uploader from 'middlewares/uploader';
import ApiController from 'controllers/api/v1';

const router = express.Router();

router.post('/import', uploader.single('file'), ApiController.import);

export default router;