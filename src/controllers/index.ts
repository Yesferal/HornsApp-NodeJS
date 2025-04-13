import { EventController } from './event.controller';
import { BandController } from './band.controller';
import { VenueController} from './venue.controller';
import { StateController } from './state.controller'
import { AppRenderController } from './app.render.controller'
import { ReviewController } from './review.controller';
import { LineupController } from './lineup.controller'

const eventController = new EventController();
const bandController = new BandController();
const venueController = new VenueController();
const stateController = new StateController()
const appRenderController = new AppRenderController()
const reviewController = new ReviewController()
const lineupController = new LineupController();

export {
    eventController,
    bandController,
    venueController,
    stateController,
    appRenderController,
    reviewController,
    lineupController,
};