import { ConcertController } from './concert.controller';
import { BandController } from './band.controller';
import { LocalController} from './local.controller';

const concertController = new ConcertController();
const bandController = new BandController();
const localController = new LocalController();

export {
    concertController,
    bandController,
    localController
};