import { ChangeEvent, KeyboardEvent, RefObject } from 'react';

export const validPasswordFormat = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;
  return passwordRegex.test(password);
};

export const onPasswordChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  setPassword: (value: string) => void,
  setPasswordMessage: (message: string) => void
) => {
  const { value } = event.target;
  setPassword(value);
  setPasswordMessage('');
};

export const onPasswordCheckChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  setConfirmPassword: (value: string) => void,
  setPasswordCheckMessage: (message: string) => void
) => {
  const { value } = event.target;
  setConfirmPassword(value);
  setPasswordCheckMessage('');
};

export const onPasswordKeyDownHandler = (
  event: KeyboardEvent<HTMLInputElement>,
  nextRef: RefObject<HTMLInputElement>,
  password: string,
  setPasswordMessage: (message: string) => void
) => {
  if (event.key !== 'Enter') return;
  if (!validPasswordFormat(password)) {
    setPasswordMessage('비밀번호는 8-13자의 영어 대소문자와 숫자를 포함해야 합니다.');
    return;
  } else {
    setPasswordMessage('사용 가능한 비밀번호입니다.');
  }
  if (!nextRef.current) return;
  nextRef.current.focus();
};

export const onPasswordCheckKeyDownHandler = (
  event: KeyboardEvent<HTMLInputElement>,
  nextRef: RefObject<HTMLInputElement>,
  password: string,
  confirmPassword: string,
  setPasswordCheckMessage: (message: string) => void
) => {
  if (event.key !== 'Enter') return;
  if (password !== confirmPassword) {
    setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
    return;
  } else {
    setPasswordCheckMessage('비밀번호가 일치합니다.');
  }
  if (!nextRef.current) return;
  nextRef.current.focus();
};
