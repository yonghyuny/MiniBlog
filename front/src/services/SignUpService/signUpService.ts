// services/Auth/signUpService.ts
import { SignUpRequestDto } from 'utils/DtoUtil/request/auth';
import { signUpRequest } from 'services/Auth/authService';
import { ResponseBody } from 'utils/TypeUtil';
import { SignUpResponseDto } from 'utils/DtoUtil/response/auth';
import { ResponseCode } from 'utils/TypeUtil/enums';
import { validPasswordFormat } from '../SignUpService/passwordService';

export const onSignUpButtonClickHandler = (
  username: string,
  password: string,
  confirmPassword: string,
  email: string,
  certificationNumber: string,
  idCheck: boolean,
  certificationCheck: boolean,
  setIdMessage: (message: string) => void,
  setIdError: (error: boolean) => void,
  setIdCheck: (check: boolean) => void,
  setPasswordMessage: (message: string) => void,
  setConfirmPasswordMessage: (message: string) => void,
  setEmailMessage: (message: string) => void,
  setEmailError: (error: boolean) => void,
  setCertificationNumberMessage: (message: string) => void,
  setCertificationNumberError: (error: boolean) => void,
  setCertificationCheck: (check: boolean) => void,
  navigateToLogin: () => void
) => {
  const id = username;
  if (!id || !password || !confirmPassword || !email || !certificationNumber) return;
  if (!idCheck) {
    setIdMessage('중복 확인은 필수입니다.');
    setIdError(true);
    return;
  }
  const checkedPassword = validPasswordFormat(password);
  if (!checkedPassword) {
    setPasswordMessage('영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요.');
    return;
  }
  if (password !== confirmPassword) {
    setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.');
    return;
  }
  if (!certificationCheck) {
    setEmailMessage('이메일 인증은 필수입니다.');
    setEmailError(true);
    return;
  }

  const requestBody: SignUpRequestDto = { id, password, email, certificationNumber };
  signUpRequest(requestBody).then(response =>
    signUpResponse(response, setIdError, setIdMessage, setIdCheck, setCertificationNumberError, setCertificationNumberMessage, setCertificationCheck, navigateToLogin)
  );
};

const signUpResponse = (
  responseBody: ResponseBody<SignUpResponseDto>,
  setIdError: (error: boolean) => void,
  setIdMessage: (message: string) => void,
  setIdCheck: (check: boolean) => void,
  setCertificationNumberError: (error: boolean) => void,
  setCertificationNumberMessage: (message: string) => void,
  setCertificationCheck: (check: boolean) => void,
  navigateToLogin: () => void
) => {
  if (!responseBody) return;

  const { code } = responseBody;
  if (code === ResponseCode.VAILDATION_FAIL) alert('모든 값을 입력하세요');
  if (code === ResponseCode.DUPLICATE_ID) {
    setIdError(true);
    setIdMessage('이미 사용중인 아이디 입니다.');
    setIdCheck(false);
  }
  if (code === ResponseCode.CERTIFICATION_FAIL) {
    setCertificationNumberError(true);
    setCertificationNumberMessage('인증번호가 일치하지 않습니다');
    setCertificationCheck(false);
  }
  if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
  if (code !== ResponseCode.SUCCEESS) return;

  navigateToLogin();
};
