import { products } from './data';
import { ProductClass, ProductFactory } from './types';

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const showProductsButton = document.getElementById('show-products');

    if (productList && showProductsButton) {
        showProductsButton.addEventListener('click', () => {
            // Очищаем список перед добавлением новых элементов
            productList.innerHTML = '';

            products.forEach(product => {
                const productDiv = document.createElement('div');
                product.displayInfo(productDiv);
                productList.appendChild(productDiv);
            });
        });
    }

    const productTypeSelect = document.getElementById('productType') as HTMLSelectElement;
    const clothingFields = document.getElementById('clothingFields') as HTMLDivElement;
    const footwearFields = document.getElementById('footwearFields') as HTMLDivElement;

    if (productTypeSelect && clothingFields && footwearFields) {
        productTypeSelect.addEventListener('change', () => {
            const selectedType = productTypeSelect.value;

            // Скрываем все динамические поля
            clothingFields.style.display = 'none';
            footwearFields.style.display = 'none';

            // Показываем поля для выбранного типа продукта
            if (selectedType === 'ClothingClass') {
                clothingFields.style.display = 'block';
            } else if (selectedType === 'FootwearClass') {
                footwearFields.style.display = 'block';
            }
        });
    }

    const productForm = document.getElementById('productForm') as HTMLFormElement;

    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Получаем значения из формы
            const productName = (document.getElementById('name') as HTMLInputElement).value;
            const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
            const imagePath = (document.getElementById('imagePath') as HTMLInputElement).value;
            const productType = (document.getElementById('productType') as HTMLSelectElement).value;

            // Создаем продукт через фабрику
            let product: ProductClass;

            if (productType === 'ClothingClass') {
                const material = (document.getElementById('material') as HTMLInputElement).value;
                const color = (document.getElementById('color') as HTMLInputElement).value;
                product = ProductFactory.createProduct(productType, productName, price, imagePath, material, color);
            } else if (productType === 'FootwearClass') {
                const shoeSize = parseFloat((document.getElementById('shoeSize') as HTMLInputElement).value);
                const isSport = (document.getElementById('isSport') as HTMLInputElement).checked;
                product = ProductFactory.createProduct(productType, productName, price, imagePath, shoeSize, isSport);
            } else {
                throw new Error('Unknown product type');
            }
            products.push(product);

            // Выводим информацию о продукте
            const outputDiv = document.getElementById('output') as HTMLDivElement;
            if (outputDiv) {
                outputDiv.innerHTML = '';
                product.displayInfo(outputDiv);

                // Выводим количество созданных продуктов
                const countDiv = document.createElement('div');
                countDiv.textContent = `Total products created: ${ProductClass.getInstanceCount()}`;
                outputDiv.appendChild(countDiv);
            }

            // Очищаем форму
            productForm.reset();

            // Скрываем динамические поля
            if (clothingFields && footwearFields) {
                clothingFields.style.display = 'none';
                footwearFields.style.display = 'none';
            }
        });
    }
});