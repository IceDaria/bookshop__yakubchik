import './styles/main.scss';
import './components/Slider';
import Sidebar from './components/Sidebar';
import BookCard from './components/BookCards';
import Api from './components/Api';
import {config} from './config';


const api = new Api();
const bookList = new Sidebar(setBooks, createBook, config);
bookList.setListeners();

function setBooks(category) {
    api.getBooks(config.end, category).then(({items}) => {
        bookList.renderBooks(items);
    }).catch(error => {
        console.log(error)
    })
}

function createBook(data) {
    const bookCard = new BookCard(data, config);
    bookCard.render();
}

bookList.setBooks('Architecture');
