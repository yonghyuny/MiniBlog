export const getDeviceInfo = () => {
    // 디바이스 정보 가져오는 로직을 구현합니다.
    const deviceInfo:string = navigator.userAgent;
    
    return deviceInfo;
};