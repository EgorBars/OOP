import { products } from './data';
import { ProductClass, ProductFactory, getAvailableProductTypes, Command } from './types';

const command = new Command(products);

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

    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');

    if (undoButton && redoButton) {
        undoButton.addEventListener('click', () => {
            command.undo();
            showProductsButton?.click(); // Обновляем список
        });

        redoButton.addEventListener('click', () => {
            command.redo();
            showProductsButton?.click(); // Обновляем список
        });
    }

    const productForm = document.getElementById('productForm') as HTMLFormElement;
    const productTypeSelect = document.getElementById('productType') as HTMLSelectElement;

    const clothingFields = document.getElementById('clothingFields') as HTMLDivElement;
    const footwearFields = document.getElementById('footwearFields') as HTMLDivElement;

    if (productTypeSelect && clothingFields && footwearFields) {
        const availableTypes = getAvailableProductTypes();
        availableTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            productTypeSelect.appendChild(option);
        });
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
    if (productList && showProductsButton) {
        showProductsButton.addEventListener('click', () => {
            productList.innerHTML = '';

            products.forEach((product, index) => {
                const productDiv = document.createElement('div');
                product.displayInfo(productDiv);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
                    command.execute(() => {
                        products.splice(index, 1);
                    });
                    showProductsButton.click(); // Обновляем список
                });
                const editForm = document.getElementById('editForm') as HTMLDivElement;
                const saveEditButton = document.getElementById('saveEdit') as HTMLButtonElement;
                productDiv.appendChild(deleteButton);
                productList.appendChild(productDiv);
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    // Заполняем форму редактирования
                    (document.getElementById('editName') as HTMLInputElement).value = product.name;
                    (document.getElementById('editPrice') as HTMLInputElement).value = product.price.toString();
                    (document.getElementById('editImagePath') as HTMLInputElement).value = product.imagePath;

                    // Показываем форму редактирования
                    editForm.style.display = 'block';

                    // Обработчик для кнопки Save
                    saveEditButton.onclick = () => {
                        command.execute(() => {
                            product.name = (document.getElementById('editName') as HTMLInputElement).value;
                            product.price = parseFloat((document.getElementById('editPrice') as HTMLInputElement).value);
                            product.imagePath = (document.getElementById('editImagePath') as HTMLInputElement).value;
                        });
                    
                        editForm.style.display = 'none';
                        showProductsButton.click();
                    };
                });
                productDiv.appendChild(editButton);
                productList.appendChild(productDiv);
            });

        });
    }
   


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
            command.execute(() => {
                products.push(product);
            });

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