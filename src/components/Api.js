export default class Api {

    getBooks(end = 6, category = 'Architecture'){
        return fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyAIHP_TkLkxcJSBIxOd9OuZH9rwpR4EaGI&printType=books&startIndex=0&maxResults=${end}&langRestrict=en`)
            .then(response => {
                if (response.ok) {
                   return response.json()
                }
                return Promise.reject(response.status);
            })
    }
}