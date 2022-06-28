import React, { FC } from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

const Spinner: FC = (): JSX.Element => {
  return (
    <MDBSpinner style={{width: '3rem', height: '3rem', marginTop: '100px'}} className='me-2'>
      <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  )
}

export default Spinner