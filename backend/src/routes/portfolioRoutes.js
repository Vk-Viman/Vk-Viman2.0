import { Router } from 'express';
import { education, personal, projects, skills } from '../data/portfolioData.js';

const router = Router();

router.get('/', (_request, response) => {
    response.json({
        personal,
        skills,
        projects,
        education,
    });
});

router.get('/personal', (_request, response) => {
    response.json(personal);
});

router.get('/skills', (_request, response) => {
    response.json(skills);
});

router.get('/projects', (_request, response) => {
    response.json(projects);
});

router.get('/education', (_request, response) => {
    response.json(education);
});

export default router;
