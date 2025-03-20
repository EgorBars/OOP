export interface Product {
    name: string;
    price: number;
    imagePath: string;
    displayInfo(infoDiv: HTMLDivElement): void; // Метод для вывода информации о продукте в HTML
}

// Класс Product, реализующий базовый интерфейс
export abstract class ProductClass implements Product {
    private static instanceCount: number = 0;

    constructor(
        public name: string, // Свойство
        public price: number, // Свойство
        public imagePath: string // Свойство
    ) {
        ProductClass.instanceCount++;
    }

    static getInstanceCount(): number {
        return ProductClass.instanceCount;
    }

    // Абстрактный метод (без реализации)
    abstract displayInfo(infoDiv: HTMLDivElement): void;
}

// Класс Clothing (наследуется от Product)
export interface Clothing extends Product {
    material: string;
    color: string;
}

// Класс Clothing, реализующий интерфейс Clothing
export class ClothingClass extends ProductClass implements Clothing {
    constructor(
        name: string,
        price: number,
        imagePath: string,
        public material: string,
        public color: string
    ) {
        super(name, price, imagePath);
    }

    displayInfo(infoDiv: HTMLDivElement): void {
        infoDiv.classList.add('product');
        const productInfoDiv = document.createElement('div');
        productInfoDiv.classList.add('product-info');

        const name = document.createElement('h2');
        name.textContent = this.name;
        infoDiv.appendChild(name);

        const price = document.createElement('p');
        price.innerHTML = `<strong>Price:</strong> $${this.price.toFixed(2)}`;
        infoDiv.appendChild(price);

        const image = document.createElement('img');
        image.src = this.imagePath;
        image.alt = this.name;
        infoDiv.appendChild(image);

        const material = document.createElement('p');
        material.innerHTML = `<strong>Material:</strong> ${this.material}`;
        infoDiv.appendChild(material);

        const color = document.createElement('p');
        color.innerHTML = `<strong>Color:</strong> ${this.color}`;
        infoDiv.appendChild(color);
    }
}
export interface UpperClothing extends Clothing {
    sleeveLength: string;
    neckType: string;
}

// Класс UpperClothing, реализующий интерфейс UpperClothing
export class UpperClothingClass extends ClothingClass implements UpperClothing {
    constructor(
        name: string,
        price: number,
        imagePath: string,
        material: string,
        color: string,
        public sleeveLength: string,
        public neckType: string
    ) {
        super(name, price, imagePath, material, color);
    }

    displayInfo(infoDiv: HTMLDivElement): void {
        super.displayInfo(infoDiv); // Выводим общую информацию
        const sleeveLength = document.createElement('p');
        sleeveLength.innerHTML = `<strong>Sleeve Length:</strong> ${this.sleeveLength}`;
        infoDiv.appendChild(sleeveLength);

        const neckType = document.createElement('p');
        neckType.innerHTML = `<strong>Neck Type:</strong> ${this.neckType}`;
        infoDiv.appendChild(neckType);
    }
}

// Класс LowerClothing (наследуется от Clothing)
export interface LowerClothing extends Clothing {
    length: number;
    waistSize: number;
}

// Класс LowerClothing, реализующий интерфейс LowerClothing
export class LowerClothingClass extends ClothingClass implements LowerClothing {
    constructor(
        name: string,
        price: number,
        imagePath: string,
        material: string,
        color: string,
        public length: number,
        public waistSize: number
    ) {
        super(name, price, imagePath, material, color);
    }

    displayInfo(infoDiv: HTMLDivElement): void {
        super.displayInfo(infoDiv); // Выводим общую информацию
        const length = document.createElement('p');
        length.innerHTML = `<strong>Length:</strong> ${this.length} cm`;
        infoDiv.appendChild(length);

        const waistSize = document.createElement('p');
        waistSize.innerHTML = `<strong>Waist Size:</strong> ${this.waistSize} inches`;
        infoDiv.appendChild(waistSize);
    }
}

// Класс Outerwear (наследуется от UpperClothing)
export interface Outerwear extends UpperClothing {
    isWaterproof: boolean;
    hasHood: boolean;
}

// Класс Outerwear, реализующий интерфейс Outerwear
export class OuterwearClass extends UpperClothingClass implements Outerwear {
    constructor(
        name: string,
        price: number,
        imagePath: string,
        material: string,
        color: string,
        sleeveLength: string,
        neckType: string,
        public isWaterproof: boolean,
        public hasHood: boolean
    ) {
        super(name, price, imagePath, material, color, sleeveLength, neckType);
    }

    displayInfo(infoDiv: HTMLDivElement): void {
        super.displayInfo(infoDiv); // Выводим общую информацию
        const isWaterproof = document.createElement('p');
        isWaterproof.innerHTML = `<strong>Waterproof:</strong> ${this.isWaterproof ? "Yes" : "No"}`;
        infoDiv.appendChild(isWaterproof);

        const hasHood = document.createElement('p');
        hasHood.innerHTML = `<strong>Has Hood:</strong> ${this.hasHood ? "Yes" : "No"}`;
        infoDiv.appendChild(hasHood);
    }
}

// Класс Footwear (наследуется от Product)
export interface Footwear extends Product {
    shoeSize: number;
    isSport: boolean;
}

// Класс Footwear, реализующий интерфейс Footwear
export class FootwearClass extends ProductClass implements Footwear {
    constructor(
        name: string,
        price: number,
        imagePath: string,
        public shoeSize: number,
        public isSport: boolean
    ) {
        super(name, price, imagePath);
    }

    displayInfo(infoDiv: HTMLDivElement): void {
        infoDiv.classList.add('product');
        const productInfoDiv = document.createElement('div');
        productInfoDiv.classList.add('product-info');

        const name = document.createElement('h2');
        name.textContent = this.name;
        infoDiv.appendChild(name);

        const price = document.createElement('p');
        price.innerHTML = `<strong>Price:</strong> $${this.price.toFixed(2)}`;
        infoDiv.appendChild(price);

        const image = document.createElement('img');
        image.src = this.imagePath;
        image.alt = this.name;
        infoDiv.appendChild(image);

        const shoeSize = document.createElement('p');
        shoeSize.innerHTML = `<strong>Shoe Size:</strong> ${this.shoeSize}`;
        infoDiv.appendChild(shoeSize);

        const isSport = document.createElement('p');
        isSport.innerHTML = `<strong>Sport:</strong> ${this.isSport ? "Yes" : "No"}`;
        infoDiv.appendChild(isSport);
    }
}
const productRegistry: Record<string, new (...args: any[]) => ProductClass> = {
    ClothingClass: ClothingClass,
    FootwearClass: FootwearClass,
    UpperClothingClass: UpperClothingClass,
    LowerClothingClass: LowerClothingClass,
    OuterwearClass: OuterwearClass,
    // Добавьте другие классы по аналогии
};

export function getAvailableProductTypes(): string[] {
    return Object.keys(productRegistry);
}

export class ProductFactory {
    static createProduct(type: string, ...args: any[]): ProductClass {
        const ProductClass = productRegistry[type];
        if (!ProductClass) {
            throw new Error(`Unknown product type: ${type}`);
        }
        return new ProductClass(...args);
    }
}
export class Command {
    private history: ProductClass[][] = [];
    private future: ProductClass[][] = [];

    constructor(private products: ProductClass[]) {
        this.history.push([...products]); // Сохраняем начальное состояние
    }

    execute(action: () => void) {
        action();
        this.history.push([...this.products]); // Сохраняем новое состояние
        this.future = [];
        console.log('History after execute:', this.history); // Логируем историю
    }

    undo() {
        if (this.history.length > 1) {
            this.future.push([...this.products]);
            this.history.pop();
            this.products.splice(0, this.products.length, ...this.history[this.history.length - 1]);
            console.log('History after undo:', this.history); // Логируем историю
        }
    }

    redo() {
        if (this.future.length > 0) {
            const nextState = this.future.pop();
            if (nextState) {
                this.history.push([...nextState]);
                this.products.splice(0, this.products.length, ...nextState);
                console.log('History after redo:', this.history); // Логируем историю
            }
        }
    }
}