import React, { useState, useEffect } from 'react';
import './App.css';
import * as axios from 'axios';
import { PostForm } from "./Components/Form/PostForm";
import { Comments } from "./Components/Comments/Comments";
import { Pagination } from './Components/Pagination/Pagination';
import { Btn } from './Components/Btn/Btn';

function App() {
  //======================                BASE URL               ==========================================
  const baseURL = "https://jordan.ashton.fashion/api/goods/30/comments";
  //=======================================================================================================

  //======================            DEFINITION CONDITION           ======================================
  const [comments, setComments] = useState([]);                 // all comments
  const [loading, setLoading] = useState(false);                // preloading
  const [currentPage, setCurrentPage] = useState('');           // current page
  const [nextPage, setNextPage] = useState('')                  // next page URL on click button 'Sow more'
  const [numbPage, setNumbPage] = useState('');                 // last page
  const [commentsPerPage, setCommentsPerPage] = useState(10);   // how many comments on page
  const [totalComments, setTotalComments] = useState('');       // total number of comments
  //=======================================================================================================

  // const indexLastComment = currentPage * commentsPerPage;                      //  I guess that the implementation of
  // const indexFirstComment = indexLastComment - commentsPerPage;                //  pagination should be based on URL,
  // const currentComment = comments.slice(indexFirstComment, indexLastComment);  //  I can't figure out how to do it

  //=======================================================================================================

  //======================           REQUEST ON SERVER           ==========================================
  useEffect(() => {
    const getComments = async () => {
      setLoading(true);                           // start loading
      let res = await axios.get(`${baseURL}`);    // fetch on base URL
      setComments(res.data.data);                 // getting data
      setCurrentPage(res.data.current_page);      // getting current page number
      setNumbPage(res.data.last_page);            // getting last page number
      setCommentsPerPage(res.data.per_page);      // getting amount comments per page
      setTotalComments(res.data.total);           // getting total number of comments
      setLoading(false);                          // finish loading
    }
    getComments();
  }, []);
  //=======================================================================================================

  //======================           GET NEXT COMMENTS           ==========================================
  const getNextComments = async () => {
    let resp = await axios.get(`${baseURL}?page=${currentPage}`);   // fetch on base URL with arguments
    setLoading(true);                                               // start loading
    setComments(resp.data.data);                                    // getting data
    setNextPage(resp.data.next_page_url);                           // next page URL on click button 'Sow more'
    setCurrentPage(prevState => ++prevState);                       // change base URL page number and new on argument
    setLoading(false);                                              // finish loading
  }
  //=======================================================================================================

  //===========================           RENDER JSX           ============================================
  return (
    <div className="App">
      <h1 className="title">Test Task</h1>
      <div className="wrapper">
        <PostForm />
        <div className="toggleComments">
          <div className="comments">
            <Comments comments={comments} loading={loading} />
            <div className="numeration">{currentPage} / {numbPage}</div>
          </div>
          <Pagination
            commentsPerPage={commentsPerPage}
            totalComments={totalComments}
            setCurrentPage={setCurrentPage}
          />
          <Btn getNextComments={getNextComments} nextPage={nextPage} />
        </div>
      </div>
    </div >
  );
}
export default App;
//=========================================================================================================
