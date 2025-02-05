import React, { useEffect } from 'react';

type Props = {
  statusCode: number;
};

type ErrorMessageType = {
  title: string;
  message: string;
  isReload?: boolean;
  onClose: () => void;
};

const ErrorComponent = ({ statusCode }: Props) => {
  useEffect(() => {
    document.body.style.zoom = '1';
  }, []);

  const handleErrorClick = () => {
    try {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const targetUrl = params.get('targetUrl') as string;

      if (targetUrl) {
        window.location.replace(targetUrl);
      }
    } catch (error) {
      console.error('[ErrorComponent] Parsing error!');
    }
  };

  const makeErrorMessage = (errorCode: number): ErrorMessageType => {
    switch (errorCode) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 408:
      case 429:
      case 500:
      case 503:
        return {
          title: '이용에 불편을 드려 죄송합니다',
          message: '잠시 후 다시 시도해주세요.',
          onClose: handleErrorClick,
        };
      default:
        return {
          title: '이용에 불편을 드려 죄송합니다',
          message: '서버 응답이 늦어지고 있어요. 잠시 후 이용해 주세요.',
          onClose: handleErrorClick,
        };
    }
  };

  const { title, message, onClose } = makeErrorMessage(statusCode || 404);

  return (
    <div className="error-container">
      <h1>{title}</h1>
      <p>{message}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default ErrorComponent;