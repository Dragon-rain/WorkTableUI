import React, { useState } from 'react'
import Style from './Paginator.module.css'


let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize=10}) => {

    let pagesCount = Math.ceil(totalItemsCount/pageSize);
    let pages = [];
    for(let i = 1; i<=pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber]= useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return (
        <span> 
            {portionNumber > 1 && <span onClick={() => setPortionNumber(portionNumber-1)}>Perv</span>}
            {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map((p) => {
                return <span key={p} onClick={(e) => onPageChanged(p)} className={(currentPage === p && Style.selectedPage)+' '+Style.currentPage}>{p}</span>
            })}
            {portionNumber < portionCount && <span onClick={() => setPortionNumber(portionNumber+1)}>Next</span>}
        </span>
    )

}

export default Paginator