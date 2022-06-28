import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

const LoadingToRedirect: FC = (): JSX.Element => {
  const [count, setCount] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(()=>{
      setCount(count => count -1)
    }, 1000)
    
    count === 0 && navigate('/login')
    return () => {
      clearInterval(interval)
    }
  }, [count, navigate])
  
  return (
    <S.RedirectContainer>
      <S.Title>Redirecting you in {count} seconds</S.Title>
    </S.RedirectContainer>
  )
}

export default LoadingToRedirect