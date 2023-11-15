import { drawerModel } from '../models'
import { IDrawer } from '../models/drawer.model'

export class DrawerController {

    public async findBy(versionCode: number, platform: string): Promise<IDrawer | undefined> {
        try {
            const item = await drawerModel
                .findOne({
                    versionCode: versionCode,
                    platform: platform
                }) as IDrawer
                

                return item
        } catch (e) {
            return undefined
        }
    }
}
