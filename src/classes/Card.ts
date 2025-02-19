const imageDir = "../assets/images/cards/"

export default class Card {
    public readonly name: string;
    public readonly price: number;
    public readonly description: string;
    public readonly imagePath: string;
    protected tag: string;

    public constructor(data: Record<string, any>) {
        this.name = data["name"];
        this.price = parseInt(data["price"]);
        this.description = data["description"] ? data["description"] : "No additional effects";
        this.imagePath = imageDir + data["image_name"];
        this.tag = "general";
    }

    getTag() {
        return this.tag;
    }
}

export class AttackCard extends Card {
    public readonly attack: number;

    public constructor(data: Record<string, any>) {
        super(data);
        let meta = data["meta"] as Record<string, any>;
        this.attack = parseInt(meta["damage"]);
        this.tag = "attack";
    }
}

export class DefenseCard extends Card {
    public readonly defense: number;

    public constructor(data: Record<string, any>) {
        super(data);
        let meta = data["meta"] as Record<string, any>;
        this.defense = parseInt(meta["protection"]);
        this.tag = "defense";
    }
}

export class HybridCard extends Card {
    public readonly attack: number;
    public readonly defense: number;

    public constructor(data: Record<string, any>) {
        super(data);
        let meta = data["meta"] as Record<string, any>;
        this.attack = parseInt(meta["damage"]);
        this.defense = parseInt(meta["protection"]);
        this.tag = "hybrid";
    }
}