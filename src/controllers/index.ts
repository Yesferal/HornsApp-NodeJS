import { ConcertController } from './concert.controller';
import { BandController } from './band.controller';
import { LocalController} from './local.controller';
import { StateController} from './state.controller';

const concertController = new ConcertController();
const bandController = new BandController();
const localController = new LocalController();
const stateController = new StateController();

export {
    concertController,
    bandController,
    localController,
    stateController
};