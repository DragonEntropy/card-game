import { ComponentInput, useAttackComponent, useDefenseComponent } from "./CardComponent";

const imageDir = "../assets/images/cards/"

export default class CardData {
    public readonly name: string;
    public readonly price: number;
    public readonly description: string;
    public readonly imagePath: string;
    public readonly meta: Record<string, any>;
    public readonly components: Array<(inputs: ComponentInput) => (boolean)> = [];
    public readonly tags: Array<string>;

    private componentMap : Record<string, (inputs: ComponentInput) => (boolean)> = {
        "attack": useAttackComponent,
        "defense": useDefenseComponent
    }
    

    public constructor(data: Record<string, any>) {
        this.name = data["name"];
        this.price = parseInt(data["price"]);
        this.description = data["description"] ? data["description"] : "No additional effects";
        this.imagePath = imageDir + data["image_name"];
        this.meta = data["meta"];
        this.tags = data["tags"];

        for (let tag of (this.tags)) {
            let component = this.componentMap[tag];
            if (component) {
                this.components.push(component);
            }
        }
    }
}