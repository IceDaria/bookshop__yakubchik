// импортируем SVG для звёздочек и стандартную обложку в случае отсутствия таковой в ГуглБукс
const starYellow = '../SVG/Star-yellow.svg';
const starWhite = '../SVG/Star-white.svg';
const defaultCover = '../images/alt-book-cover.png';

// создаём класс для карточек книг
export default class BookCard {
    constructor (data, config) {
        this.data = data;
        this.cover = data.volumeInfo.imageLinks?.thumbnail || defaultCover; // если обложка не пришла с сервера, ставим стандартную
        this.authors = data.volumeInfo.authors;
        this.title = data.volumeInfo.title;
        this.rating = data.volumeInfo.averageRating;
        this.ratingCount = data.volumeInfo.ratingsCount;
        this.description = data.volumeInfo.description;
        this.price = data.saleInfo.retailPrice;
        this.config = config;
        this.inCart = false;
        this.id = data.id;

        this.storage = JSON.parse(localStorage.getItem('buyButton')) || [];
        this.cartCounter = document.querySelector('.cart__counter');
        this.cartCounter.textContent = localStorage.getItem('cart') || 0;

        this.createCardElement();
        this.updateCartCounter();
        this.checkLocalStorage()
    }

// метод создания карточки в HTML 
    createCardElement() {
        // Создаем корневой элемент карточки книги
        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('book-card');
      
        // Создаем изображение обложки книги
        const coverImage = document.createElement('img');
        coverImage.classList.add('book__cover');
        coverImage.alt = 'Bookcover';
        coverImage.src = this.cover; // Устанавливаем URL обложки
        this.cardElement.appendChild(coverImage);
      
        // Создаем контейнер для информации о книге
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
      
        // Добавляем информацию об авторе
        const authorInfo = document.createElement('div');
        authorInfo.classList.add('book__author');
        authorInfo.textContent = this.authors?.join(', ');
        bookInfo.appendChild(authorInfo);
      
        // Добавляем название книги
        const titleInfo = document.createElement('div');
        titleInfo.classList.add('book__name');
        titleInfo.textContent = this.title;
        bookInfo.appendChild(titleInfo);
      
        // Добавляем рейтинг и отзывы
        const ratingInfo = document.createElement('div');
        ratingInfo.classList.add('book__rating');
      
        const starsContainer = document.createElement('span');
        starsContainer.classList.add('rating__stars');
      
        // Добавляем элементы звезд рейтинга
        for (let i = 1; i <= 5; i++) {
          const starImage = document.createElement('img');
          starImage.classList.add('star-icon');
          starImage.src = i <= Math.round(this.rating) ? starYellow : starWhite;
          starImage.alt = i <= Math.round(this.rating) ? 'Star-yellow' : 'Star-white';
          starsContainer.appendChild(starImage);
        }
      
        ratingInfo.appendChild(starsContainer);

        // Добавляем информацию о рейтинге книги
        const reviewInfo = document.createElement('p');
        reviewInfo.classList.add('rating__review');
        reviewInfo.textContent = this.ratingCount ? this.ratingCount + ' reviews' : 'no reviews yet';
        ratingInfo.appendChild(reviewInfo);
      
        bookInfo.appendChild(ratingInfo);
      
        // Добавляем описание книги
        const descriptionInfo = document.createElement('div');
        descriptionInfo.classList.add('book__discription');
        descriptionInfo.textContent = this.description;
        bookInfo.appendChild(descriptionInfo);
      
        // Добавляем цену книги
        const priceInfo = document.createElement('div');
        priceInfo.classList.add('book__price');
        priceInfo.textContent = this.price ? `${this.price.amount} ${this.price.currencyCode}` : 'NOT FOR SALE';
        bookInfo.appendChild(priceInfo);
      
        // Добавляем кнопку покупки
        this.buyButton = document.createElement('button');
        this.buyButton.classList.add('buy__button');
        bookInfo.appendChild(this.buyButton);
      
        this.cardElement.appendChild(bookInfo);
      }

    // обновляем счетчик на значке корзины
    updateCartCounter() {
        this.cartCounter.textContent = this.config.cart;

        if (+this.config.cart === 0 ){
            this.cartCounter.style.display = 'none';
        } else {
            this.cartCounter.style.display = 'block';
        }
    }

    // логика добавления книги в корзину
    addToCart() {
        this.buyButton.classList.toggle('active');

        //меняем надпись на кнопке
        if (!this.inCart) {
            this.buyButton.textContent = 'in the cart';
            this.config.cart++;
        } else {
            this.buyButton.textContent = 'buy now';
            this.config.cart--;
        }

        this.inCart = !this.inCart;

        this.updateCartCounter();
        this.setLocalStorage();
    }

    setLocalStorage() {
        this.storage = this.storage.filter(el => this.id !== el.id);
        this.storage.push({
            id: this.id,
            inCart: this.inCart,
        });

        localStorage.setItem('cart', this.config.cart.toString());
        localStorage.setItem('buyButton', JSON.stringify(this.storage));
    }
    
    // при загрузке страницы, проверяем локальное хранилище на наличие в корзине книг
    // если книги есть, меняем кнопку
    checkLocalStorage() {
        const bookData = this.storage.find(item => item.id === this.id);
        if (bookData) {
            this.inCart = bookData.inCart;
        }
    
        if (this.price) {
            this.buyButton.textContent = this.inCart ? 'in the cart' : 'buy now';
            this.buyButton.classList.toggle('active', this.inCart);
        } else {
            this.buyButton.textContent = 'NOT FOR SALE';
            this.buyButton.setAttribute('disabled', true);
            this.buyButton.classList.add('active');
        }
    }
    //отрисовываем карточки книг
    render() {
        this.buyButton.addEventListener('click', () => {
            this.addToCart();
        })

        document.querySelector('.book-list').appendChild(this.cardElement);
    }
}
