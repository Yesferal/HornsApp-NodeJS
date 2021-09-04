import { drawerModel } from '../models'
import { IDrawer } from '../models/drawer.model'

export class DrawerController {

    public async findLast(): Promise<IDrawer | undefined> {
        try {
            const item = await drawerModel
                .find()
                .sort({ createdAt: 1 })
                .exec()

            return item[0]
        } catch (e) {
            return undefined
        }
    }
}
