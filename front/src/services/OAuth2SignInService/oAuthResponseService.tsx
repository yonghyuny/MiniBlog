import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams }   from 'react-router-dom'
import axios from 'axios';

export default function OAuth() {

  const { token, expirationTime, refreshToken, refreshExpirationTime } = useParams();
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

useEffect(() => {
    if (!token || !expirationTime || !refreshToken || !refreshExpirationTime) return;

    const accessExpires = new Date(Number(expirationTime));
    const refreshExpires = new Date(Number(refreshExpirationTime));

    setCookie('accessToken', token, { expires: accessExpires, path: '/' });
    setCookie('refreshToken', refreshToken, { expires: refreshExpires, path: '/' });

    const getDeviceInfo = () => {
        return navigator.userAgent;
    };
    const sendTokenAndDeviceInfo = async () => {
        try {
            if (isRequestInProgress) return;
            setIsRequestInProgress(true);

            const deviceInfo = getDeviceInfo();
            const params = new URLSearchParams();
            params.append('deviceInfo', deviceInfo);
            const response = await axios.post('http://127.0.0.1:4040/api/v1/aaa/device-info', params, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Refresh-Token': refreshToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                navigate('/');
            } else {
                console.error('Failed to send device info');
            }
        } catch (error) {
            console.error('Error sending device info:', error);
        } finally {
            setIsRequestInProgress(false);
        }
    };
    sendTokenAndDeviceInfo();
}, [token, expirationTime, refreshToken, refreshExpirationTime]);

 
  return (
    <></>
  )
}
