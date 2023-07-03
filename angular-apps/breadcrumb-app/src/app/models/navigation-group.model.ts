import { NavigationItemModel } from "./navigation-item.model"

export class NavigationGroupModel{
    public pageIndex: string
    public pageTitle: string
    public items: Array<NavigationItemModel>

    constructor(obj:any | {}){
        this.pageIndex = obj.pageIndex
        this.pageTitle = obj.pageTitle
        this.items = obj.items
    }
}