import React, { useRef, useState } from 'react';
import AuthInputSection from 'sections/AuthInputSection/AuthInputSection';
import AuthButton from 'components/AuthButton/AuthButton';
import AuthDivider from 'components/AuthDivider/AuthDivider';
import SNSLoginSection from 'sections/SNSLoginSection/SNSLoginSection';
import SaveUsernameSection from 'sections/SaveUsernameSection/SaveUsernameSection';
import UserInfoLinksSection from 'sections/UserInfoLinksSection/UserInfoLinksSection';
import { 
  handleLogin as handleLoginService, 
  handleUsernameChange, 
  handlePasswordChange, 
  handleUsernameKeyDown, 
  handlePasswordKeyDown 
} from 'services/SignInService/signInService';
import useSignInResponse from 'services/SignInService/signInResponseService';
import HomeButton from 'components/HomeButton/HomeButton';
import useNavigateHelper from 'utils/NavigationUtil/navigationUtil';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { navigateToSignUp } = useNavigateHelper(); 
  const { signInResponse } = useSignInResponse();

  const handleLogin = () => {
    handleLoginService(username, password, setUsernameError, setPasswordError, usernameRef, signInResponse);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
       <div className="flex items-center justify-center mb-4">
        <HomeButton/>
        <h2 className="text-2xl font-semibold text-indigo-600 flex-grow text-center">로그인</h2>
        <div className="w-6"></div> {/* 빈 공간을 추가하여 텍스트가 중앙에 위치하도록 조정 */}
      </div>
      <AuthInputSection
        value={username}
        onChange={(e) => handleUsernameChange(e, setUsername, setUsernameError)}
        onKeyDown={(e) => handleUsernameKeyDown(e, username, setUsernameError, passwordRef)}
        showLabel={true}
        labelText="아이디"
        placeholderText="아이디를 입력하세요"
        errorText={usernameError}
        inputRef={usernameRef} // usernameRef 추가
      />
      <AuthInputSection
        value={password}
        onChange={(e) => handlePasswordChange(e, setPassword, setPasswordError)}
        onKeyDown={(e) => handlePasswordKeyDown(e, handleLogin)}
        showLabel={true}
        labelText="비밀번호"
        placeholderText="비밀번호를 입력하세요"
        inputType="password"
        inputRef={passwordRef} // passwordRef 추가
        errorText={passwordError}
      />
      <div className="flex justify-between items-center mt-4">
        <SaveUsernameSection />
        <UserInfoLinksSection />
      </div>
      <AuthButton text="로그인" onClick={handleLogin} className="mt-4" />
      <div className="my-2"></div>
      <AuthButton text="회원가입" onClick={navigateToSignUp} variant="secondary" />
      <AuthDivider />
      <SNSLoginSection />
    </div>
  );
};

export default LoginForm;
