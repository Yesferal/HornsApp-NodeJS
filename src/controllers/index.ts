import { ConcertController } from './concert.controller';
import { BandController } from './band.controller';
import { VenueController} from './venue.controller';
import { StateController} from './state.controller';

const concertController = new ConcertController();
const bandController = new BandController();
const venueController = new VenueController();
const stateController = new StateController();

export {
    concertController,
    bandController,
    venueController,
    stateController
};