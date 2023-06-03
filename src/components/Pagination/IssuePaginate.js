import React from 'react'
import ReactPaginate from 'react-paginate';
import "./IssuePagination.css"
function IssuePaginate(props) {
  
  const handlePageClick=(data)=>{
      console.log(data.selected)
      props.handlePage(data.selected+1)
  }
  return (
    <div className='pagination'>
        
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={props.total_page}
                marginPagesDisplayed={3}
                pageRangeDisplayed={6}
                onPageChange={handlePageClick}
                containerClassName={'paginationul'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                activeLinkClassName={'active'}

            />
      {/* <button onClick={handlePrevPage}>Previous</button>
        <button onClick={handleNextPage}>Next</button> */}
      </div>
  )
}

export default IssuePaginate
