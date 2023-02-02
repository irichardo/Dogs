import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./modules/pagination.module.css"

export const Pagination = ({elementsPerPage,allElements, paginado, prevHandler, nextHandler, reset})=>{
   const numberPage = [];
   const[buttonIndex, setButtonIndex]=useState(0);
   const[buttonIndex2, setButtonIndex2]=useState(5);
   const[color, setColor] = useState(1);

   
   for(let i = 1 ; i <= Math.ceil(allElements/elementsPerPage); i++){
      
      numberPage.push(i);
      
   }
   
   
   
   const numberArray = numberPage.slice(buttonIndex,buttonIndex2);
   
   
   
   
   const buttonIndexHandler = (number) =>{
      setColor(number);
   }
   
   
   const nextPrevHandler =(value) =>{
      let val = value.target.value;
      
      if(buttonIndex2 === 5 && color-1>0){
         setColor(color-1)
      }
      if(buttonIndex2 === Math.ceil(allElements/elementsPerPage )&& color+1 < Math.ceil(allElements/elementsPerPage )+1){
         setColor(color+1)
      }
      
      if(val === 'next' && buttonIndex2 < Math.ceil(allElements/elementsPerPage)){
         setButtonIndex(buttonIndex+1);
         setButtonIndex2(buttonIndex2+1);
         setColor(color+1)
      }
if(val === 'prev' && buttonIndex>0){
   setButtonIndex(buttonIndex-1);
   setButtonIndex2(buttonIndex2-1);
   setColor(color-1)
   
}
if(val === 'allPrev'){
   setButtonIndex(0);
   setButtonIndex2(5)
   setColor(1)
}

if(val === 'allNext' ){
   setButtonIndex(Math.ceil(allElements/elementsPerPage)-5);
   setButtonIndex2(Math.ceil(allElements/elementsPerPage))
   setColor(Math.ceil(allElements/elementsPerPage))
}
}



useEffect(()=>{
   if(reset === true){
      
      setButtonIndex(0);
      
      setButtonIndex2(5);
      
      setColor(1);

   prevHandler('init');
}}
,[reset])



return(
<nav>
    <ul>
    <li className={styles.pagination_a}>
         <button value={'allPrev'}  onClick={(e)=>{prevHandler('init');{nextPrevHandler(e)}}}>{`<--`} </button></li>
      <li className={styles.pagination_a}>
         <button value={'prev'} onClick={(e)=>{prevHandler();nextPrevHandler(e)}}>prev</button></li>
           {
             numberPage&&numberArray.map(number=>(

             <li onClick={()=>{ paginado(number); buttonIndexHandler(number)}} key={number} className={styles.pagination_a}>
    
             <button type="button" className={number===color?styles.buttonIndicator:styles.buttonIndicatorNoSelected} value ={number} >{number}</button>
    
             </li>))
          }
       <li className={styles.pagination_a}> <button value={'next'} onClick={(e)=>{nextHandler();nextPrevHandler(e)}}>next</button> </li>
       <li className={styles.pagination_a}>
         <button value={'allNext'}  onClick={(e)=>{nextHandler('final');nextPrevHandler(e)}}>{`-->`} </button></li>
     </ul>
</nav >

   )
};