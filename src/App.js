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
  const [comments, setComments] = useState([]);
  const [numbPage, setNumbPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [nextPage, setNextPage] = useState('')
  const [commentsPerPage, setCommentsPerPage] = useState(10);
  const [totalComments, setTotalComments] = useState('');

  // const indexLastComment = currentPage * commentsPerPage;
  // const indexFirstComment = indexLastComment - commentsPerPage;
  // const currentComment = comments.slice(indexFirstComment, indexLastComment);

  //=======================================================================================================

  //======================           REQUEST ON SERVER           ==========================================
  useEffect(() => {
    const getComments = async () => {
      setLoading(true);
      let res = await axios.get(`${baseURL}`);
      setComments(res.data.data);
      setCurrentPage(res.data.current_page);
      setNumbPage(res.data.last_page);
      // setCommentsPerPage(res.data.per_page);
      setTotalComments(res.data.total);
      setLoading(false);
    }
    getComments();
  }, []);
  //=======================================================================================================

  //======================           GET NEXT COMMENTS           ==========================================
  const getNextComments = async () => {
    let resp = await axios.get(`${baseURL}?page=${currentPage}`);
    setLoading(true);
    setComments(resp.data.data);
    setNextPage(resp.data.next_page_url);
    setCurrentPage(prevState => ++prevState);
    setLoading(false);
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
//=======================================================================================================
