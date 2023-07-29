export class NavigationItemModel{
    public label: string
    public url: string
    public queryParams?: {}

    constructor(obj:any | {}){
        this.label = obj.label
        this.url = obj.url
        this.queryParams = obj.queryParams
    }
}