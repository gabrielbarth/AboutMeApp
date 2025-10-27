import { authErrorMessages } from 'src/constants/errors/auth';

function getAuthErrorMessage(error: unknown): string {
  const defaultMessage = 'Ocorreu um erro inesperado. Tente novamente.';

  const errorMessage = String(error);
  const match = errorMessage.match(/\[auth\/[^\]]+\]/);

  if (match) {
    const errorCode = match[0].replace('[', '').replace(']', '');
    return (
      authErrorMessages[errorCode as keyof typeof authErrorMessages] ||
      defaultMessage
    );
  }

  return defaultMessage;
}

export { getAuthErrorMessage };
