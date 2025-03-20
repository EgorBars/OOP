// Класс Product, реализующий базовый интерфейс
export class ProductClass {
    constructor(name, // Свойство
    price, // Свойство
    imagePath // Свойство
    ) {
        this.name = name;
        this.price = price;
        this.imagePath = imagePath;
        ProductClass.instanceCount++;
    }
    static getInstanceCount() {
        return ProductClass.instanceCount;
    }
}
ProductClass.instanceCount = 0;
// Класс Clothing, реализующий интерфейс Clothing
export class ClothingClass extends ProductClass {
    constructor(name, price, imagePath, material, color) {
        super(name, price, imagePath);
        this.material = material;
        this.color = color;
    }
    displayInfo(infoDiv) {
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
// Класс UpperClothing, реализующий интерфейс UpperClothing
export class UpperClothingClass extends ClothingClass {
    constructor(name, price, imagePath, material, color, sleeveLength, neckType) {
        super(name, price, imagePath, material, color);
        this.sleeveLength = sleeveLength;
        this.neckType = neckType;
    }
    displayInfo(infoDiv) {
        super.displayInfo(infoDiv); // Выводим общую информацию
        const sleeveLength = document.createElement('p');
        sleeveLength.innerHTML = `<strong>Sleeve Length:</strong> ${this.sleeveLength}`;
        infoDiv.appendChild(sleeveLength);
        const neckType = document.createElement('p');
        neckType.innerHTML = `<strong>Neck Type:</strong> ${this.neckType}`;
        infoDiv.appendChild(neckType);
    }
}
// Класс LowerClothing, реализующий интерфейс LowerClothing
export class LowerClothingClass extends ClothingClass {
    constructor(name, price, imagePath, material, color, length, waistSize) {
        super(name, price, imagePath, material, color);
        this.length = length;
        this.waistSize = waistSize;
    }
    displayInfo(infoDiv) {
        super.displayInfo(infoDiv); // Выводим общую информацию
        const length = document.createElement('p');
        length.innerHTML = `<strong>Length:</strong> ${this.length} cm`;
        infoDiv.appendChild(length);
        const waistSize = document.createElement('p');
        waistSize.innerHTML = `<strong>Waist Size:</strong> ${this.waistSize} inches`;
        infoDiv.appendChild(waistSize);
    }
}
// Класс Outerwear, реализующий интерфейс Outerwear
export class OuterwearClass extends UpperClothingClass {
    constructor(name, price, imagePath, material, color, sleeveLength, neckType, isWaterproof, hasHood) {
        super(name, price, imagePath, material, color, sleeveLength, neckType);
        this.isWaterproof = isWaterproof;
        this.hasHood = hasHood;
    }
    displayInfo(infoDiv) {
        super.displayInfo(infoDiv); // Выводим общую информацию
        const isWaterproof = document.createElement('p');
        isWaterproof.innerHTML = `<strong>Waterproof:</strong> ${this.isWaterproof ? "Yes" : "No"}`;
        infoDiv.appendChild(isWaterproof);
        const hasHood = document.createElement('p');
        hasHood.innerHTML = `<strong>Has Hood:</strong> ${this.hasHood ? "Yes" : "No"}`;
        infoDiv.appendChild(hasHood);
    }
}
// Класс Footwear, реализующий интерфейс Footwear
export class FootwearClass extends ProductClass {
    constructor(name, price, imagePath, shoeSize, isSport) {
        super(name, price, imagePath);
        this.shoeSize = shoeSize;
        this.isSport = isSport;
    }
    displayInfo(infoDiv) {
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
const productRegistry = {
    ClothingClass: ClothingClass,
    FootwearClass: FootwearClass,
    UpperClothingClass: UpperClothingClass,
    LowerClothingClass: LowerClothingClass,
    OuterwearClass: OuterwearClass,
    // Добавьте другие классы по аналогии
};
export function getAvailableProductTypes() {
    return Object.keys(productRegistry);
}
export class ProductFactory {
    static createProduct(type, ...args) {
        const ProductClass = productRegistry[type];
        if (!ProductClass) {
            throw new Error(`Unknown product type: ${type}`);
        }
        return new ProductClass(...args);
    }
}
export class Command {
    constructor(products) {
        this.products = products;
        this.history = [];
        this.future = [];
        this.history.push([...products]); // Сохраняем начальное состояние
    }
    execute(action) {
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
