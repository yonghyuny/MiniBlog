// src/containers/TestContainer/TestPostContainer.tsx
import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal/Modal';
import CommonHeaderSection from 'sections/CommonHeaderSection/CommonHeaderSection';
import CommonDropDownSection from 'sections/CommonDropDownSection/CommonDropDownSection';
import { combinedLogoutHandler } from 'services/LogOutService/logOutService';
import useNavigateHelper from 'utils/NavigationUtil/navigationUtil';
import { useParams } from 'react-router-dom';
import { checkPostOwner, fetchPostById } from 'services/Auth/authService';
import TestForm from 'forms/TestForm/TestForm';
import { HeaderProvider, useHeader } from 'services/HeaderService/HeaderService';
import { useAuth } from 'hooks/useAuthHook';

const TestPostContainer: React.FC = () => {
  const { navigateToCreateNickname, navigateToLogin, navigateToUserBlog, navigateToCreatePost, navigateToHome } = useNavigateHelper();
  const { dropdownOpen, toggleDropdown } = useHeader();
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [blogNickname, setBlogNickname] = useState<string>('');
  const [thisPostId, setThisPostId] = useState<string>('');
  const [postContent, setPostContent] = useState<any>(null);
  const [isOwner, setisOwner] = useState<boolean>(false);

  const { postId, nickname } = useParams<{ postId: string; nickname: string }>();

  const handleCheckPostOwner = async (nickname: string) => {
    console.log("여기 오긴오냐?");
    if (postId) {
      const isOwner = await checkPostOwner(postId);
      setisOwner(isOwner);
      if (isOwner) {
        console.log('소유자입니다. 추가 작업을 수행합니다.');
      } else {
        console.log('소유자가 아닙니다. 다른 작업을 수행합니다.');
      }
    }
  };

  const { hasNickname, myNickname, nicknameModalOpen, setNicknameModalOpen } = useAuth(handleCheckPostOwner);

  useEffect(() => {
    console.log("게시글 ID:", postId, "닉네임:", nickname);
    if (nickname) setBlogNickname(nickname);
    if (postId) setThisPostId(postId);
    if (postId) {
      console.log("여기실행은됌?");
      fetchPostById(postId)
        .then(data => {
          setPostContent(data.postList[0]);
          console.log('Fetched Post Data:', data);
        })
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [postId, nickname]);

  const nicknameModalConfirm = () => {
    navigateToCreateNickname();
  };

  const handleLogOut = async () => {
    const result = await combinedLogoutHandler(navigateToHome);
    if (result) {
      setLogOutModalOpen(true);
    }
  };

  const logOutModalConfirm = () => {
    setRefresh(prev => !prev);
    navigateToHome();
  };

  const handleHeaderClick = () => {
    if (blogNickname) {
      navigateToUserBlog(blogNickname);
    }
  };

  return (
    <HeaderProvider>
      <div className="max-w-screen-2xl mx-auto">
        <CommonHeaderSection
          title={`${blogNickname || ''}'s blog`}
          onHeaderClick={handleHeaderClick}
          hasNickname={hasNickname}
          nickname={myNickname}
          onLoginClick={navigateToLogin}
          onNicknameClick={toggleDropdown}
        />
        {dropdownOpen && (
          <CommonDropDownSection
            onMyPageClick={() => myNickname && navigateToUserBlog(myNickname)}
            onCreatePostClick={navigateToCreatePost}
            onLogoutClick={handleLogOut}
            onDeleteAccountClick={navigateToHome}
          />
        )}
      
        {postContent ? (
          <TestForm 
            title={postContent.title || ''} 
            nickname={postContent.nickname || ''} 
            date={postContent.createdAt || ''} 
            content={postContent.content || ''} 
            likeCount={postContent.likeCount || '0'} 
          />
        ) : (
          <div>Loading...</div>
        )}

        <Modal
          isOpen={nicknameModalOpen}
          onClose={() => setNicknameModalOpen(false)}
          onConfirm={nicknameModalConfirm}
          message="닉네임 생성은 필수 입니다."
        />
        <Modal
          isOpen={logOutModalOpen}
          onClose={() => setLogOutModalOpen(false)}
          onConfirm={logOutModalConfirm}
          message="로그아웃 성공"
        />
      </div>
    </HeaderProvider>
  );
};

export default TestPostContainer;
