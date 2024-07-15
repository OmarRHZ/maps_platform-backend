import { Router } from "express";
import {PrismaClient} from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

const ACCEPTED_ORIGINS=[
    'http://localhost:5173',
    'https://omarrhz.github.io',
    'https://omarrhz.github.io/maps_platform/',
]
//GET ALL LANDPLOTS
router.get('/landplots', async (req, res) => {
    const origin = req.header('origin');
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
    }

    const landplots = await prisma.landplots.findMany()
    if (!landplots) {
        return res.status(404).send('Landplots not found');
    }
    res.send(landplots);
});
//GET A SINGLE LANDPLOT BY ID
router.get('/landplots/:id', async (req, res) => {
    const origin = req.header('origin');
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
    }

    const { id } = req.params;
    const FoundedLandplot = await prisma.landplots.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    if (!FoundedLandplot) {
        return res.status(404).send('Landplot not found');
    }
    res.json(FoundedLandplot);
});

//GET A SINGLE LANDPLOT BY NAME
router.get('/landplots/name/:name', async (req, res) => {
    const origin = req.header('origin');
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
    }

    const { name } = req.params;
    console.log(name);
    const FoundedLandplot = await prisma.landplots.findFirst({
        where: {
            name: name,
        },
    });
    if (!FoundedLandplot) {
        return res.status(404).send('Landplot not found');
    }
    res.json(FoundedLandplot);
});

//POST A NEW LANDPLOT
router.post('/landplots', async (req, res) => {
    const origin = req.header('origin');
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
    }

    const newLandplot= await prisma.landplots.create({
        data: req.body,
    });
    res.json(newLandplot);
});
//UPDATE A LANDPLOT

router.put('/landplots/:id', async (req, res) => {
    const origin = req.header('origin');
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin);
    }

    const { id } = req.params;
    const UpdatedLandplot = await prisma.landplots.update({
        where: {
            id: parseInt(id),
        },
        data: req.body,
    });
    res.json(UpdatedLandplot);
});

//DELETE A LANDPLOT
router.delete('/landplots/:id', async (req, res) => {
    const { id } = req.params;
    const DeletedLandplot = await prisma.landplots.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.json(DeletedLandplot);
});

export default router;