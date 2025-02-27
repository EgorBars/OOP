import { FootwearClass, OuterwearClass } from "./types.js";
// Создаем массив продуктов, используя соответствующие классы
export const products = [
    new OuterwearClass("Winter Jacket", 120, "../img/Jacket.jpg", // Укажи правильный путь
    "Polyester", "Black", "Long", "Collar", true, true),
    new FootwearClass("Running Shoes", 80, "../img/Shoes.png", // Укажи правильный путь
    42, true),
    new FootwearClass("Running Shoes", 80, "../img/Shoes.png", // Укажи правильный путь
    42, true),
    new FootwearClass("Running Shoes", 80, "../img/Shoes.png", // Укажи правильный путь
    42, true),
    new FootwearClass("Running Shoes", 80, "../img/Shoes.png", // Укажи правильный путь
    42, true),
    new FootwearClass("Running Shoes", 80, "../img/Shoes.png", // Укажи правильный путь
    42, true),
    new FootwearClass("Running Shoes", 80, "../img/Shoes.png", // Укажи правильный путь
    42, true),
    new OuterwearClass("Winter Jacket", 120, "../img/Jacket.jpg", // Укажи правильный путь
    "Polyester", "Black", "Long", "Collar", true, true)
    // Добавь другие продукты
];
