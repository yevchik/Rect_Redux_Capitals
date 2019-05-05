import React from 'react';

const Answers = ({answer, className,onClick}) =>
 <div className={className} onClick={(e)=>onClick(e)}>
     <p>{answer.capital}</p>
 </div>


export default Answers;