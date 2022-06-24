import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { MDBBtn, MDBPagination, MDBPaginationItem } from 'mdb-react-ui-kit';
import React, { FC } from 'react'

interface PaginationProps {
  setCurrentPage: () => void;
  dispatch: Dispatch<AnyAction>;
  currentPage: number;
  numberOfPages: number;
}

const Pagination: FC<PaginationProps> = ({setCurrentPage, currentPage, numberOfPages, dispatch}) => {

  const renderPagination = () =>{
    if(currentPage === numberOfPages && currentPage === 1) return null;
    if(currentPage === 1) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">1</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={()=> {
                // @ts-ignore
                dispatch(setCurrentPage(currentPage + 1))
              }}
              >
                Next
              </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else if(currentPage !== numberOfPages) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={()=> {
                // @ts-ignore
                dispatch(setCurrentPage(currentPage - 1))
              }}
              >
                Prev
              </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold-mt-1">{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={()=> {
                // @ts-ignore
                dispatch(setCurrentPage(currentPage + 1))
              }}
              >
                Next
              </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else {
      return (
      <MDBPagination center className='mb-0'>
        <MDBPaginationItem>
          <MDBBtn
            rounded
            className='mx-2'
            onClick={()=> {
              // @ts-ignore
              dispatch(setCurrentPage(currentPage - 1))
            }}
            >
              Prev
          </MDBBtn>
        </MDBPaginationItem>
      </MDBPagination>
    )}
  }
  return (
    <div className='mt-4'>{renderPagination()}</div>
  )
}

export default Pagination