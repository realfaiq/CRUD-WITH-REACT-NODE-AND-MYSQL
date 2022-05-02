import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = ()=>{
    Axios.post("http://localhost:3001/api/insert",
    {
      movieName: movieName, 
      movieReview: review
    })
    setMovieReviewList([...movieReviewList,
      {moviename: movieName, moviereview:review}
    ]);
  };

  //That Parameter of movie is the moviename of the Particular movie we want to delete and it's coming from  below
  const deleteReview = (movie)=>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`
    );
  }

  const updateReview = (movie)=>{
    Axios.put('http://localhost:3001/api/update',{
      movieName: movie,
      movieReview: newReview
    });
    setNewReview("");
    
  }


  return (
    <div className="App">
      <h1>CRUD IN REACT</h1>
    <div className='form'>
      <label>Movie Name</label>
      <input type='text' name='moviename' onChange={(e)=>{
        setMovieName(e.target.value);
      }} />
      <label>Movie Review</label>
      <input className='text' name='moviereview' onChange={(e)=>{
        setReview(e.target.value);
      }} />
      <button className='btn' onClick={submitReview} >Submit</button>
      
        {movieReviewList.map((val)=>{
          return (
          <div className='card'>
            <h1>{val.moviename}</h1>
            <p>{val.moviereview}</p>

            <button onClick={()=>{deleteReview(val.moviename)}} className='btn'>Delete</button>
            <input type="text" id='updateInput' onChange={(e)=>{
              setNewReview(e.target.value);
            }} />
            <button onClick={()=>{updateReview(val.moviename)}} className='btn'>Update</button>
          </div>
          )})};
      
    </div>

    </div>
  );
}

export default App;
