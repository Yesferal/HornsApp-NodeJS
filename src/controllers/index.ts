import { ConcertController } from './concert.controller';
import { BandController } from './band.controller';
import { VenueController} from './venue.controller';
import { StateController } from './state.controller'
import { AppRenderController } from './app.render.controller'
import { ReviewController } from './review.controller';

const concertController = new ConcertController();
const bandController = new BandController();
const venueController = new VenueController();
const stateController = new StateController()
const appRenderController = new AppRenderController()
const reviewController = new ReviewController();

export {
    concertController,
    bandController,
    venueController,
    stateController,
    appRenderController,
    reviewController
};