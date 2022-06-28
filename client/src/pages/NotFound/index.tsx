import React, { FC } from 'react';
import * as S from './styled';

const NotFound: FC = (): JSX.Element => {
  return (
    <S.NotFoundContainer>
      <S.NotFoundImage src='/images/404.jpg' alt='Not Found'/>
    </S.NotFoundContainer>
  )
}

export default NotFound