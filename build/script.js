import { products } from "./data.js";
import { ProductClass, ProductFactory } from "./types.js";
// Ждем загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const showProductsButton = document.getElementById("show-products");
    if (productList && showProductsButton) {
        showProductsButton.addEventListener("click", () => {
            // Очищаем список перед добавлением новых элементов
            productList.innerHTML = "";
            products.forEach(product => {
                const productDiv = document.createElement("div");
                product.displayInfo(productDiv);
                productList.appendChild(productDiv);
            });
        });
    }
    const productTypeSelect = document.getElementById("productType");
    const clothingFields = document.getElementById("clothingFields");
    const footwearFields = document.getElementById("footwearFields");
    if (productTypeSelect && clothingFields && footwearFields) {
        productTypeSelect.addEventListener("change", () => {
            const selectedType = productTypeSelect.value;
            // Скрываем все динамические поля
            clothingFields.style.display = "none";
            footwearFields.style.display = "none";
            // Показываем поля для выбранного типа продукта
            if (selectedType === "ClothingClass") {
                clothingFields.style.display = "block";
            }
            else if (selectedType === "FootwearClass") {
                footwearFields.style.display = "block";
            }
        });
    }
    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();
            // Получаем значения из формы
            const productName = document.getElementById("name").value;
            const price = parseFloat(document.getElementById("price").value);
            const imagePath = document.getElementById("imagePath").value;
            const productType = document.getElementById("productType").value;
            // Создаем продукт через фабрику
            let product;
            if (productType === "ClothingClass") {
                const material = document.getElementById("material").value;
                const color = document.getElementById("color").value;
                product = ProductFactory.createProduct(productType, productName, price, imagePath, material, color);
            }
            else if (productType === "FootwearClass") {
                const shoeSize = parseFloat(document.getElementById("shoeSize").value);
                const isSport = document.getElementById("isSport").checked;
                product = ProductFactory.createProduct(productType, productName, price, imagePath, shoeSize, isSport);
            }
            else {
                throw new Error("Unknown product type");
            }
            products.push(product);
            // Выводим информацию о продукте
            const outputDiv = document.getElementById("output");
            if (outputDiv) {
                outputDiv.innerHTML = "";
                product.displayInfo(outputDiv);
                // Выводим количество созданных продуктов
                const countDiv = document.createElement("div");
                countDiv.textContent = `Total products created: ${ProductClass.getInstanceCount()}`;
                outputDiv.appendChild(countDiv);
            }
            // Очищаем форму
            productForm.reset();
            // Скрываем динамические поля
            if (clothingFields && footwearFields) {
                clothingFields.style.display = "none";
                footwearFields.style.display = "none";
            }
        });
    }
});
