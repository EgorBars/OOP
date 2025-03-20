import { products } from "./data.js";
import { ProductClass, ProductFactory, getAvailableProductTypes, Command } from "./types.js";
const command = new Command(products);
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
    const undoButton = document.getElementById("undo");
    const redoButton = document.getElementById("redo");
    if (undoButton && redoButton) {
        undoButton.addEventListener("click", () => {
            command.undo();
            showProductsButton === null || showProductsButton === void 0 ? void 0 : showProductsButton.click(); // Обновляем список
        });
        redoButton.addEventListener("click", () => {
            command.redo();
            showProductsButton === null || showProductsButton === void 0 ? void 0 : showProductsButton.click(); // Обновляем список
        });
    }
    const productForm = document.getElementById("productForm");
    const productTypeSelect = document.getElementById("productType");
    const clothingFields = document.getElementById("clothingFields");
    const footwearFields = document.getElementById("footwearFields");
    if (productTypeSelect && clothingFields && footwearFields) {
        const availableTypes = getAvailableProductTypes();
        availableTypes.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            productTypeSelect.appendChild(option);
        });
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
    if (productList && showProductsButton) {
        showProductsButton.addEventListener("click", () => {
            productList.innerHTML = "";
            products.forEach((product, index) => {
                const productDiv = document.createElement("div");
                product.displayInfo(productDiv);
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    command.execute(() => {
                        products.splice(index, 1);
                    });
                    showProductsButton.click(); // Обновляем список
                });
                const editForm = document.getElementById("editForm");
                const saveEditButton = document.getElementById("saveEdit");
                productDiv.appendChild(deleteButton);
                productList.appendChild(productDiv);
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.addEventListener("click", () => {
                    // Заполняем форму редактирования
                    document.getElementById("editName").value = product.name;
                    document.getElementById("editPrice").value = product.price.toString();
                    document.getElementById("editImagePath").value = product.imagePath;
                    // Показываем форму редактирования
                    editForm.style.display = "block";
                    // Обработчик для кнопки Save
                    saveEditButton.onclick = () => {
                        command.execute(() => {
                            product.name = document.getElementById("editName").value;
                            product.price = parseFloat(document.getElementById("editPrice").value);
                            product.imagePath = document.getElementById("editImagePath").value;
                        });
                        editForm.style.display = "none";
                        showProductsButton.click();
                    };
                });
                productDiv.appendChild(editButton);
                productList.appendChild(productDiv);
            });
        });
    }
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
            command.execute(() => {
                products.push(product);
            });
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
