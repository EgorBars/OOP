import { ProductClass, FootwearClass, OuterwearClass, ClothingClass, LowerClothingClass, UpperClothingClass } from './types';
export const products: ProductClass[] = [
    new OuterwearClass(
        "Winter Jacket",
        120.00,
        "../img/Jacket.jpg",
        "Polyester",
        "Black",
        "Long",
        "Collar",
        true,
        true
    ),
    new FootwearClass(
        "Running Shoes",
        80.00,
        "../img/Shoes.png",
        42,
        true
    ),
    new FootwearClass(
        "Running Shoes",
        80.00,
        "../img/Shoes.png",
        42,
        true
    ),
    new FootwearClass(
        "Running Shoes",
        80.00,
        "../img/Shoes.png",
        42,
        true
    ),
    new FootwearClass(
        "Running Shoes",
        80.00,
        "../img/Shoes.png",
        42,
        true
    ),
    new FootwearClass(
        "Running Shoes",
        80.00,
        "../img/Shoes.png",
        42,
        true
    ),
    new FootwearClass(
        "Running Shoes",
        80.00,
        "../img/Shoes.png",
        42,
        true
    ),new OuterwearClass(
        "Winter Jacket",
        120.00,
        "../img/Jacket.jpg",
        "Polyester",
        "Black",
        "Long",
        "Collar",
        true,
        true
    ),new LowerClothingClass(
        "trousers",
        100.00,
        "../img/Jacket.jpg",
        "Poluester",
        "black",
        150.00,
        64.00
    ),
    new UpperClothingClass(
        "trousers",
        100.00,
        "../img/Jacket.jpg",
        "Poluester",
        "black",
        "long",
        "high"
    )
];