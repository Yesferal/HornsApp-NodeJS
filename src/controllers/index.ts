import { EventController } from './event.controller';
import { ActivityController } from './activity.controller';
import { VenueController} from './venue.controller';
import { StateController } from './state.controller'
import { AppRenderController } from './app.render.controller'
import { ReviewController } from './review.controller';
import { LineupController } from './lineup.controller'
import { CategoryController } from './category.controller'

const eventController = new EventController();
const activityController = new ActivityController();
const venueController = new VenueController();
const stateController = new StateController()
const appRenderController = new AppRenderController()
const reviewController = new ReviewController()
const lineupController = new LineupController()
const categoryController = new CategoryController();

export {
    eventController,
    activityController,
    venueController,
    stateController,
    appRenderController,
    reviewController,
    lineupController,
    categoryController,
};