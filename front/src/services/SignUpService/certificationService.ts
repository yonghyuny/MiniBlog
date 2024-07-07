import { ChangeEvent, KeyboardEvent } from 'react';
import { CheckCertificationRequestDto } from 'utils/DtoUtil/request/auth';
// import { ResponseBody } from 'types';
import { ResponseBody } from 'utils/TypeUtil';
import { ResponseCode } from 'utils/TypeUtil/enums';
import { CheckCertificationResponseDto } from 'utils/DtoUtil/response/auth';

import { checkCertificationRequest } from 'services/Auth/authService';

export const onCertificationNumberKeyDownHandler = (
  event: KeyboardEvent<HTMLInputElement>,
  onCertificationNumberButtonClickHandler: () => void
) => {
  if (event.key !== 'Enter') return;
  onCertificationNumberButtonClickHandler();
};

export const onCertificationNumberButtonClickHandler = (
  username: string,
  email: string,
  certificationNumber: string,
  setCertificationNumberMessage: (message: string) => void,
  setCertificationNumberError: (error: boolean) => void,
  setCertificationCheck: (check: boolean) => void
) => {
  if (!username || !email || !certificationNumber) {
    setCertificationNumberMessage('아이디, 이메일, 인증번호를 모두 입력하세요');
    setCertificationNumberError(true);
    return;
  }
  if (certificationNumber.length < 4) {
    setCertificationNumberMessage('인증번호 4자리를 입력하세요');
    setCertificationNumberError(true);
    return;
  }

  const requestBody: CheckCertificationRequestDto = { id: username, email, certificationNumber };
  checkCertificationRequest(requestBody).then(response =>
    checkCertificationResponse(response, setCertificationNumberMessage, setCertificationNumberError, setCertificationCheck)
  );
};

export const onCertificationNumberChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  setCertificationNumber: (number: string) => void,
  setCertificationNumberMessage: (message: string) => void,
  setCertificationCheck: (check: boolean) => void
) => {
  const { value } = event.target;
  setCertificationNumber(value);
  setCertificationNumberMessage('');
  setCertificationCheck(false);
};

export const checkCertificationResponse = (
  responseBody: ResponseBody<CheckCertificationResponseDto>,
  setCertificationNumberMessage: (message: string) => void,
  setCertificationNumberError: (error: boolean) => void,
  setCertificationCheck: (check: boolean) => void
) => {
  if (!responseBody) return;

  const { code } = responseBody;
  if (code === ResponseCode.VAILDATION_FAIL) {
    alert('아이디, 이메일, 인증번호를 모두 입력하세요');
    setCertificationNumberMessage('아이디, 이메일, 인증번호를 모두 입력하세요');
    setCertificationNumberError(true);
    return;
  }
  if (code === ResponseCode.CERTIFICATION_FAIL) {
    setCertificationNumberError(true);
    setCertificationNumberMessage('인증번호가 일치하지 않습니다');
    setCertificationCheck(false);
    return;
  }
  if (code === ResponseCode.DATABASE_ERROR) {
    alert('데이터베이스 오류입니다.');
    setCertificationNumberMessage('데이터베이스 오류입니다.');
    setCertificationNumberError(true);
    return;
  }
  if (code === ResponseCode.SUCCEESS) {
    setCertificationNumberError(false);
    setCertificationNumberMessage('인증번호가 확인되었습니다.');
    setCertificationCheck(true);
  }
};
