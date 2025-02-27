import { products } from './data';

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
