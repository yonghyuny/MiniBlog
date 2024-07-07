// 쿠키에서 값을 가져오는 함수
export const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined; // 찾지못하면 undefined js 관례
};

// 쿠키에 값을 설정하는 함수
export const setCookie = (name: string, value: string, options: { expires: Date, path: string }) => {
    const optionsString = Object.entries(options).map(([key, val]) => `${key}=${val}`).join('; ');
    document.cookie = `${name}=${value}; ${optionsString}`;
};