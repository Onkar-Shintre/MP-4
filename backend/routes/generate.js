import { Router } from 'express';
import { generateQuestions } from '../services/aiService.js';

const router = Router();

/**
 * POST /api/generate
 * Body: { "domain": "Frontend Developer" }
 * Returns generated interview questions as JSON.
 */
router.post('/', async (req, res) => {
    const { domain } = req.body;

    // Validate input
    if (!domain || typeof domain !== 'string' || domain.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'Field "domain" is required and must be a non-empty string.',
        });
    }

    try {
        const data = await generateQuestions(domain.trim());

        return res.status(200).json({
            success: true,
            ...data,
        });
    } catch (error) {
        console.error('[Route Error]', error.message);
        return res.status(500).json({
            success: false,
            error: 'Failed to generate questions. Please try again.',
        });
    }
});

export default router;
