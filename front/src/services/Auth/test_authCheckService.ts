import axios from "axios";

import { getDeviceInfo } from "utils/DeviceInfoUtil/deviceInfoUtil";
import { getCookie, setCookie } from "utils/CookieUtil/cookieUtis";




const DOMAIN = 'http://127.0.0.1:4040';
const API_DOMAIN = `${DOMAIN}/api/v1`;

const REFRESH_TOKEN_URL = () => `${API_DOMAIN}/aaa/refresh-token`;
const AAA_URL = () => `${API_DOMAIN}/aaa/aaa`;


////////////////////////////////////////////////////////////////////////////////////

const refreshAccessToken = (refreshToken: string, deviceInfo: string) => {
  const requestBody = { deviceInfo, ipAddress: '' };

  return axios.post(REFRESH_TOKEN_URL(), requestBody, {
    headers: { 'Authorization': `Bearer ${refreshToken}` },
    withCredentials: true
  })
  .then((response) => {
    const { accessToken, refreshToken: newRefreshToken, accessTokenExpirationTime, refreshTokenExpirationTime } = response.data;
    
    const accessTokenExpires = new Date(accessTokenExpirationTime);
    const refreshTokenExpires = new Date(refreshTokenExpirationTime);

    setCookie('accessToken', accessToken, { expires: accessTokenExpires, path: '/' });
    setCookie('refreshToken', newRefreshToken, { expires: refreshTokenExpires, path: '/' });
    return accessToken;
  })
  .catch((error) => {
    console.error("토큰 갱신 실패", error);
    return null;
  });
};

  const handleTokenRefresh = (refreshToken: string, deviceInfo: string) => {
    return refreshAccessToken(refreshToken, deviceInfo)
      .then((newAccessToken) => {
        if (newAccessToken) {
          return 'success';
        } else {  
          return 'failure';
        }
      })
      .catch((error) => {
        console.error('리프레쉬 토큰 갱신 실패', error);
        return 'failure';
      });
  };

  const verifyAccessToken = (accessToken: string, refreshToken?: string, deviceInfo?: string) => {
    return axios.get(AAA_URL(), {
      headers: { 'Authorization': `Bearer ${accessToken}` },
      withCredentials: true
    })
    .then(() => {    
      return 'success';
    })
    .catch((error) => {
      console.error("엑세스 토큰 인증 실패", error);
  
      if (refreshToken && deviceInfo) {
        return handleTokenRefresh(refreshToken, deviceInfo);
      } else {
        return 'failure';
      }
    });
  };
  
  export const authCheck = (onSuccess: () => void, onFailure: () => void) => {
    const { accessToken, refreshToken } = getTokens();
    const deviceInfo = getDeviceInfo();
  
    if (!accessToken && !refreshToken) { // 엑세스, 리프레시 둘 다 존재 X
      return onFailure();
    }
  
    if (accessToken) { // 엑세스 존재 O
      console.log("1-1");
      verifyAccessToken(accessToken, refreshToken, deviceInfo)
        .then((response) => {
          if (response === 'success') {
            onSuccess();
          } else {
            onFailure();
          }
        })
        .catch(onFailure);
    } else if (refreshToken) { // 엑세스 존재 X, 리프레시 존재 O
      console.log("1-2-1");
      handleTokenRefresh(refreshToken, deviceInfo)
        .then((response) => {
          if (response === 'success') {
            onSuccess();
          } else {
            onFailure();
          }
        })
        .catch(onFailure);
    }
  };
  

  const getTokens = () => {
    const accessToken: string | undefined = getCookie('accessToken');
    const refreshToken: string | undefined = getCookie('refreshToken');
    return { accessToken, refreshToken };
  };