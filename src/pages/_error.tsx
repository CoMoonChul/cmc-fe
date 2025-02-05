import { NextPageContext } from 'next';
import React from 'react';
import ErrorComponent from '../components/ErrorComponent';

interface ErrorProps {
  statusCode?: number;
}

function RootError({ statusCode }: ErrorProps) {
  return <ErrorComponent statusCode={statusCode || 404} />;
}

RootError.getInitialProps = ({ res, err }: NextPageContext) => {
  let statusCode: number;
  if (res) {
    statusCode = res.statusCode || 500;
  } else if (err) {
    statusCode = err.statusCode || 500;
  } else {
    statusCode = 404;
  }

  return { statusCode };
};

export default RootError;
