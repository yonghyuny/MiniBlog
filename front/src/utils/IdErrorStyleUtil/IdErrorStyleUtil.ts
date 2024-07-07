// src/utils/classUtils.ts

/**
 * 주어진 에러 타입에 따라 CSS 클래스를 반환합니다.
 * @param errorType 'error' | 'success' | 'smallError'
 * @returns CSS 클래스 문자열
 */
export const getErrorClass = (errorType: 'error' | 'success' | 'smallError'): string => {
    if (errorType === 'smallError') {
      return 'text-red-500 text-sm'; // text-sm으로 변경하여 글씨 크기 조정
    } else if (errorType === 'success') {
      return 'text-blue-500';
    }
    return 'text-red-500';
  };
  