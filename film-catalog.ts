/*Что нужно сделать

Модели — опишите interface Movie с полями: id, title, year, rating, genre, description, director. Поля description и director — опциональные
Жанры — создайте массив жанров (comedy, drama, action, horror, sci-fi) с помощью as const и выведите из него тип Genre
Фильтры — создайте union-тип SortBy для сортировки по year, rating, title
Карточка и превью — с помощью utility types создайте:
MovieCard — только id, title, year, rating из Movie
MovieFull — все поля Movie, но readonly
Функции (3 штуки):
filterByGenre(movies: Movie[], genre: Genre): Movie[]
sortMovies(movies: Movie[], by: SortBy): Movie[]
toCard(movie: Movie): MovieCard
Маппинг жанров на emoji — создайте объект, который сопоставляет каждому жанру emoji. Используйте mapped type, as const или satisfies — на выбор. Забытый жанр должен вызывать ошибку компиляции

Критерии приёмки

 GENRES — readonly ["comedy", "drama", ...], не string[]
 filterByGenre(movies, "romance") — ошибка компиляции (жанра нет в списке)
 GENRE_EMOJI проверяется на полноту — забытый жанр = ошибка компиляции
 MovieFull — все поля readonly*/

interface Movie {
    id : number,
    title : string,
    year : number,
    rating : number,
    genre : Genre,
    description? : string,
    director? : string
}
const genres = ['comedy', 'drama', 'action', 'horror', 'sci_fi'] as const
type Genre = typeof genres[number];

type SortBy = 'year' | 'rating' | 'title'

type MovieCard = Pick<Movie, 'id' | 'title' | 'year' | 'rating'>
type MovieFull = Readonly<Movie>

function filterByGenre(movies: Movie[], genre: Genre): Movie[] {
    if (!Array.isArray(movies)) {
        return []
    }
    return movies.filter(movie => movie.genre === genre);
}

function sortMovies(movies: Movie[], by: SortBy): Movie[] {
    if (!Array.isArray(movies)) {
        return [];
    }
    const sortedMovies = [...movies];
    if (by === "year")
        return sortedMovies.sort((a: Movie, b: Movie) => b.year - a.year)
    if (by === "rating")
        return sortedMovies.sort((a: Movie, b: Movie) => b.rating - a.rating)
    if (by === "title") {
        return sortedMovies.sort((a: Movie, b: Movie) : number => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        })
    }
    return sortedMovies;
}

function toCard(movie: Movie): MovieCard {
    return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        rating: movie.rating
    }
}


const movie1 : Movie = {
    id: 1,
    title: "Interstellar",
    year: 2018,
    rating: 4.9,
    genre: "drama",
}
const movie2 : Movie = {
    id: 2,
    title: "Fight Club",
    year: 1998,
    rating: 4.8,
    genre: "action",
}
const movie3 : Movie = {
    id: 3,
    title: "Fast and Furious 4",
    year: 2013,
    rating: 4.1,
    genre: "action",
}
const movies = [movie1, movie2, movie3]

filterByGenre(movies, "action");
sortMovies(movies, "title");
toCard(movie1);

const GENRE_EMOJI  = {
    comedy: "😂",
    drama: "😔",
    action: "🔥",
    horror: "💀",
    sci_fi: "🤔"
} satisfies Record<Genre, string>