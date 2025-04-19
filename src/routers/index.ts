import { router as concertRouter } from './concert.router'
import { router as eventRouter } from './event.router'
import { router as adminEventRouter } from './admin/event.router';
import { router as activityRouter } from './activity.router'
import { router as adminActivityRouter } from './admin/activity.router';
import { router as venueRouter } from './venue.router'
import { router as adminVenueRouter } from './admin/venue.router'
import { router as adminStateRouter } from './state.router'
import { router as adminCategoryRouter } from './admin/category.router'
import { router as lineupRouter } from './lineup.router'
import { router as screenRenderRouter } from './screen.render.router';
import { router as adminScreenRenderRouter } from './admin/screen.render.router';
import { router as adminAppRenderRouter } from './admin/app.render.router';

export {
    concertRouter, // FIXME: Remove it eventually
    eventRouter,
    adminEventRouter,
    activityRouter,
    adminActivityRouter,
    venueRouter,
    lineupRouter,
    adminVenueRouter,
    adminStateRouter,
    adminCategoryRouter,
    screenRenderRouter,
    adminScreenRenderRouter,
    adminAppRenderRouter
};