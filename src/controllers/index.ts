import { ConcertController } from './concert.controller';
import { BandController } from './band.controller';

const concertController = new ConcertController();
const bandController = new BandController();

export {
    concertController,
    bandController
};