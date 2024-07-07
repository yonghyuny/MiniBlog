import { NicknameRequestDto } from 'utils/DtoUtil/request/auth';
import { checkNicknameRequest, createNicknameRequest } from 'services/Auth/authService';
import { ResponseCode } from 'utils/TypeUtil/enums';

export const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>, setNickname: React.Dispatch<React.SetStateAction<string>>, setNicknameError: React.Dispatch<React.SetStateAction<string>>, setErrorType: React.Dispatch<React.SetStateAction<'error' | 'success' | 'smallError'>>, setIsNicknameAvailable: React.Dispatch<React.SetStateAction<boolean>>) => {
    setNickname(event.target.value);
    setNicknameError('');
    setErrorType('error');
    setIsNicknameAvailable(false);
};

export const checkNicknameAvailability = async (nickname: string, setNicknameError: React.Dispatch<React.SetStateAction<string>>, setErrorType: React.Dispatch<React.SetStateAction<'error' | 'success' | 'smallError'>>, setIsNicknameAvailable: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        if (!nickname) {
            setNicknameError('닉네임을 입력해주세요');
            setErrorType('error');
            setIsNicknameAvailable(false);
            return;
        }
        const requestBody: NicknameRequestDto = { nickname };
        const response = await checkNicknameRequest(requestBody);
        if (response?.code === ResponseCode.SUCCEESS) {
            setNicknameError('닉네임 사용가능');
            setErrorType('success');
            setIsNicknameAvailable(true);
        } else if (response?.code === ResponseCode.DUPLICATE_ID) {
            setNicknameError('이미 존재하는 닉네임입니다.');
            setErrorType('error');
            setIsNicknameAvailable(false);
        } else {
            setNicknameError('닉네임을 입력해주세요');
            setErrorType('error');
            setIsNicknameAvailable(false);
        }
    } catch (error) {
        setNicknameError('Error checking nickname');
        setErrorType('error');
        setIsNicknameAvailable(false);
    }
};

export const handleCreateNickname = async (nickname: string, isNicknameAvailable: boolean, setNicknameError: React.Dispatch<React.SetStateAction<string>>, setErrorType: React.Dispatch<React.SetStateAction<'error' | 'success' | 'smallError'>>, setSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!isNicknameAvailable) {
        setNicknameError('먼저 닉네임 중복 확인을 해주세요.');
        setErrorType('error');
        return;
    }

    try {
        const requestBody: NicknameRequestDto = { nickname };
        const response = await createNicknameRequest(requestBody);
        if (response?.code === ResponseCode.SUCCEESS) {
            setSuccessModalOpen(true);  // 닉네임 생성 성공 시 모달 띄우기
        } else {
            setNicknameError('닉네임 생성 중 오류 발생');
            setErrorType('error');
        }
    } catch (error) {
        setNicknameError('닉네임 생성 중 오류 발생');
        setErrorType('error');
    }
};