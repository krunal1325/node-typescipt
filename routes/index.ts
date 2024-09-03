import express, { Request, Response } from "express";
import userRoutes from './user.routes'
import path from "path";
import fs from 'fs';

const router = express.Router();

router.use('/user', userRoutes);

// Routes for error logs
router.get('/download-logs', (req: Request, res: Response) => {
    const fileName = 'error.log';
    const filePath = path.join(__dirname, '../logs', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
        console.error('File download failed:', err);
        res.status(500).send('Failed to download file.');
        }
    });
});

router.delete('/clear-logs', (req: Request, res: Response) => {
    const logFilePath = path.join(__dirname, '../logs', 'error.log');
    fs.truncate(logFilePath, 0, (err) => {
        if (err) {
        return res.status(500).send('Failed to clear the log file.');
        }
        res.send('Log file cleared successfully.');
    });
});

export default router