// import { SNS_SIGN_IN_URL } from "../Auth/authService";
import { SNS_SIGN_IN_URL } from "../../utils/APIUrlUtil/apiUrlUtil";

export const onSnsSignInButtonClickHandler = (type: 'kakao' | 'naver') => {
    window.location.href = SNS_SIGN_IN_URL(type);
  };