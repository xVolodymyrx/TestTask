import React, { useState, useEffect } from 'react';
import * as axios from 'axios';
import stylePostForm from '../Form/PostForm.module.css';

export const PostForm = () => {
  const url = ' https://jordan.ashton.fashion/api/goods/30/comments';
  //=========================================================================================================

  //======================            DEFINITION CONDITION           ========================================
  const [nameDirty, setNameDirty] = useState(false);                                        // was the cursor on this input field
  const [textDirty, setTextDirty] = useState(false);                                        // was the cursor on this input field
  const [nameError, setNameError] = useState("Поле обязательное для заполнения");           // warning of error
  const [textError, setTextError] = useState("Поле обязательное для заполнения");           // warning of error
  const [formValid, setFormValid] = useState(false);                                        // validation 
  const [data, setData] = useState({                                                        // add needed fields on State
    name: '',
    text: '',
  })
  //=========================================================================================================

  //===========================      ADD NEEDED VALUES IN FIELDS          ===================================
  const submit = (e) => {
    e.preventDefault();
    axios.post(url, { name: data.name, text: data.text, })
      .then(res => { console.log(res.data) })
  }
  //=========================================================================================================

  //===========================         GETTING VALUE ON INPUT       ========================================
  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
    //=======================================================================================================

    //===========================          EXAMINATION NAME FIELD           =================================
    if (
      e.target.value === "" ||
      e.target.value === " " ||
      e.target.value === "  " ||
      e.target.value === "   " ||
      e.target.value === "    " ||
      e.target.value === "     " ||
      e.target.value === "      " ||
      e.target.value === "       " ||
      e.target.value === "        " ||
      e.target.value === "         "
    ) {
      setNameError("Некоректное Имя...");
    } else {
      setNameError("");
    };
    //=======================================================================================================

    //===========================          EXAMINATION TEXT FIELD           =================================
    if (
      e.target.value === "" ||
      e.target.value === " " ||
      e.target.value === "  " ||
      e.target.value === "   " ||
      e.target.value === "    " ||
      e.target.value === "     " ||
      e.target.value === "      " ||
      e.target.value === "       " ||
      e.target.value === "        " ||
      e.target.value === "         " ||
      e.target.value === "          " ||
      e.target.value === "           " ||
      e.target.value === "            "
    ) {
      setTextError("Поле не может быть пустым...");
    } else {
      setTextError("");
    };
  }
  //=======================================================================================================

  //=============           EXAMINATION CURSOR ON THIS INPUT FIELD           ==============================
  const blurHeandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "text":
        setTextDirty(true);
        break;
      default:
    };
  }
  //=======================================================================================================

  //===========================          VALIDATION FORM           ========================================
  useEffect(() => {
    if (nameError || textError) {
      setFormValid(false)
    } else {
      setFormValid(true);
    }
  }, [nameError, textError]);
  //=======================================================================================================

  //===========================           RENDER JSX           ============================================
  return (
    <form onSubmit={(e) => { submit(e) }} className={stylePostForm.form}>

      {(nameDirty && nameError) && <div className={stylePostForm.error}>{nameError}</div>}
      <input onChange={e => handle(e)} value={data.name} onBlur={e => blurHeandler(e)}
        id='name' name="name" type="text" placeholder="Enter your name..." className={stylePostForm.name} />

      {(textDirty && textError) && <div className={stylePostForm.error}>{textError}</div>}
      <textarea onChange={e => handle(e)} value={data.text} onBlur={e => blurHeandler(e)}
        id='text' name="text" type="text" placeholder="Your comment..." className={stylePostForm.text} />

      <button disabled={!formValid} type="submit" className={stylePostForm.btn}>Коментировать</button>

    </form >
  );
}
  //=======================================================================================================
