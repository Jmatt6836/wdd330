export default class QuoteGetter{
    constructor(authorId, quotesId){
        this.authorId = authorId;
        this.quotesId = quotesId;
        this.quotes = [];
        this.quotesAuthors = [];
        this.init();
    }

    async init(){
        this.quotes = await this.getQuotes();
        console.log(this.quotes);
        this.quotesAuthors = this.extractAuthors();
        this.buildAuthorSelect();
    }

    async getQuotes(){
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        return data;
    }
    extractAuthors(){
        const authors = new Set(this.quotes.map(quote=>quote.author));
        return [...authors];
    }

    buildAuthorSelect(){
        const element = document.getElementById(this.authorId);
        const authorHTML = this.quotesAuthors.map(author=>`<option value = "${author}">${author}.</option>`);
        element.innerHTML = authorHTML.join("")
    }

    filterByAuthor(author){
        const filtered = this.quotes.filter(quote=>quote.author === author);
        this.renderQuotes(filtered);
    }

    renderQuotes(quotes){
        const element = document.getElementById(this.quotesId);
        element.innerHTML = quotes.map(quote=> `<li>${quote.text}</li>`).join("");
    }



}