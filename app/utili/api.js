var api = {
  addQuestion(question){
    var url = `https://name-that-movie.firebaseio.com/questionsANDanswers.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(question)
    }).then((res) => res.json());
  },
  getQuestions(){
    var url = `https://name-that-movie.firebaseio.com/questionsANDanswers.json`;
    return fetch(url).then((res) => res.json());
  },
  addNewQuestion(newquestion){
    var url = `https://name-that-movie.firebaseio.com/newquestions.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(newquestion)
    }).then((res) => res.json());
  },
  getNewQuestions(){
    var url = `https://name-that-movie.firebaseio.com/newquestions.json`;
    return fetch(url).then((res) => res.json());
  },
  addMovie(movie){
    var url = `https://name-that-movie.firebaseio.com/myfavmovies.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(movie)
    }).then((res) => res.json());
  },
  getMovies(){
    var url = `https://name-that-movie.firebaseio.com/myfavmovies.json`;
    return fetch(url).then((res) => res.json());
  },
};

module.exports = api;
