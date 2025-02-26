import { ComponentInput, useAttackComponent, useCureComponent, useDefenseComponent, useHealComponent, useManaComponent, useOnDamageComponent } from "./CardComponent";

const imageDir = "../assets/images/cards/"

export default class CardData {
    public readonly name: string;
    public readonly price: number;
    public readonly description: string;
    public readonly imagePath: string;
    public readonly meta: Record<string, any>;
    public readonly baseComponents: Array<(inputs: ComponentInput) => (boolean)> = [];
    public readonly additionalComponents: Array<(inputs: ComponentInput) => (boolean)> = [];
    public readonly tags: Array<string>;

    private static baseComponentMap : Record<string, (inputs: ComponentInput) => (boolean)> = {
        "attack": useAttackComponent,
        "defense": useDefenseComponent
    };
    private static additionalComponentMap : Record<string, (inputs: ComponentInput) => (boolean)> = {
        "heal": useHealComponent,
        "mana": useManaComponent,
        "cure": useCureComponent,
        "onDamage": useOnDamageComponent
    }
    

    public constructor(data: Record<string, any>) {
        this.name = data["name"];
        this.price = parseInt(data["price"]);
        this.description = data["description"] ? data["description"] : "No additional effects";
        this.imagePath = imageDir + data["image_name"];
        this.meta = data["meta"];
        this.tags = data["tags"];

        for (let tag of (this.tags)) {
            let component = CardData.baseComponentMap[tag];
            if (component) {
                this.baseComponents.push(component);
            }

            component = CardData.additionalComponentMap[tag];
            if (component) {
                this.additionalComponents.push(component);
            }
        }
    }
}