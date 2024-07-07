import React, { useEffect, useState } from 'react';
import AuthInputSection from 'sections/AuthInputSection/AuthInputSection';
import AuthButton from 'components/AuthButton/AuthButton';
import HomeButton from 'components/HomeButton/HomeButton';
import useNavigateHelper from 'utils/NavigationUtil/navigationUtil';
import { onHomeButtonClickHandler as authOnHomeButtonClickHandler } from 'services/Auth/authService';
import { combinedLogoutHandler } from 'services/Auth/authService';
import Modal from 'components/Modal/Modal';
import { handleNicknameChange, checkNicknameAvailability, handleCreateNickname } from 'services/NicknameService/nicknameService';

const CreateNickNameForm: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [errorType, setErrorType] = useState<'error' | 'success' | 'smallError'>('error');
  const { navigateToHome, navigateToLogin } = useNavigateHelper();
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const [createNicknameModalOpen, setCreateNicknameModalOpen] = useState(false);

  useEffect(() => {
    console.log("Hello World");
    authOnHomeButtonClickHandler(
      () => console.log("로그인 사용자"),
      () => setSignInModalOpen(true)
    );
  }, []);

  const handleLogOut = async () => {
    const result = await combinedLogoutHandler(navigateToHome);
    if (result) {
      setLogOutModalOpen(true);
    }
  };

  const handleLogOutModalConfirm = () => {
    navigateToHome();
  };

  const handleSignInModalConfirm = () => {
    navigateToLogin();
  };

  const handleSuccessModalConfirm = () => {
    setCreateNicknameModalOpen(false);
    navigateToHome();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
      <div className="flex items-center justify-center mb-4">
        <HomeButton />
        <h2 className="text-2xl font-semibold text-indigo-600 flex-grow text-center">닉네임 생성</h2>
        <div className="w-6"></div>
      </div>
      <AuthInputSection
        value={nickname}
        onChange={(event) => handleNicknameChange(event, setNickname, setNicknameError, setErrorType, setIsNicknameAvailable)}
        onButtonClick={() => checkNicknameAvailability(nickname, setNicknameError, setErrorType, setIsNicknameAvailable)}
        showLabel={true}
        labelText="닉네임"
        buttonText="중복 확인"
        placeholderText="닉네임을 입력하세요"
        errorText={nicknameError}
        errorType={errorType}
      />
      <div className="flex flex-col space-y-2 mt-4">
        <AuthButton 
          text="닉네임 생성" 
          onClick={() => handleCreateNickname(nickname, isNicknameAvailable, setNicknameError, setErrorType, setCreateNicknameModalOpen)} 
          className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        />
        <AuthButton 
          text="로그아웃" 
          onClick={handleLogOut} 
          variant="secondary"
          className="w-full p-2"
        />
        <Modal 
          isOpen={createNicknameModalOpen} 
          onClose={() => setCreateNicknameModalOpen(false)}
          onConfirm={handleSuccessModalConfirm} 
          message="닉네임을 설정하였습니다." 
        />
        <Modal 
          isOpen={signInModalOpen} 
          onClose={() => setSignInModalOpen(false)}
          onConfirm={handleSignInModalConfirm} 
          message="로그인 해주세요" 
        />
        <Modal 
          isOpen={logOutModalOpen} 
          onClose={() => setLogOutModalOpen(false)}
          onConfirm={handleLogOutModalConfirm} 
          message="로그아웃 성공" 
        />
      </div>
    </div>
  );
};

export default CreateNickNameForm;
