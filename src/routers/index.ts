import { router as concertRouter } from './concert.router'
import { router as adminConcertRouter } from './admin/concert.router';
import { router as bandRouter } from './band.router'
import { router as adminBandRouter } from './admin/band.router';
import { router as venueRouter } from './venue.router'
import { router as adminVenueRouter } from './admin/venue.router'
import { router as stateRouter } from './state.router'
import { router as screenRenderRouter } from './screen.render.router';
import { router as adminScreenRenderRouter } from './admin/screen.render.router';
import { router as adminAppRenderRouter } from './admin/app.render.router';

export {
    concertRouter,
    adminConcertRouter,
    bandRouter,
    adminBandRouter,
    venueRouter,
    adminVenueRouter,
    stateRouter,
    screenRenderRouter,
    adminScreenRenderRouter,
    adminAppRenderRouter
};