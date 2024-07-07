import axios from "axios";


import { getCookie } from "utils/CookieUtil/cookieUtis";



const DOMAIN = 'http://127.0.0.1:4040';
const API_DOMAIN = `${DOMAIN}/api/v1`;



const NICKNAME_FIND_URL = () => `${API_DOMAIN}/aaa/nickname-find`;



const findNickname = async () => {
    const result = await axios.post(NICKNAME_FIND_URL(), {}, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error finding nickname', error);
      return null;
    });
    return result;
  };

export const nicknameCheck = (onSuccess: (nickname: string) => void, onFailure: () => void) => {
    findNickname()
      .then(response => {
        if (response?.nickname) {
          onSuccess(response.nickname);
        } else {
          console.log('Nickname not found.');
          onFailure();
        }
      })
      .catch(error => {
        console.error('Error occurred while checking nickname', error);
        onFailure();
      });
  };
  

  