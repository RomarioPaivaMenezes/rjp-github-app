import type { Router } from 'express';
import { getMonitorItem, postMonitorItem } from '../controllers/monitor';




export default function (router: Router) {
    router.post('/monitor', postMonitorItem);
    router.get('/monitor/:itemId', getMonitorItem);
    return router;
}
