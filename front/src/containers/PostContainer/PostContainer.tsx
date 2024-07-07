import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal/Modal';
import CommonHeaderSection from 'sections/CommonHeaderSection/CommonHeaderSection';
import CommonDropDownSection from 'sections/CommonDropDownSection/CommonDropDownSection';
import { authCheck } from 'services/Auth/test_authCheckService';
import { nicknameCheck } from 'services/Auth/test_nicknameCheckService';
import { combinedLogoutHandler } from 'services/LogOutService/logOutService';
import useNavigateHelper from 'utils/NavigationUtil/navigationUtil';
import { useParams } from 'react-router-dom';
import { checkPostOwner, fetchPostById } from 'services/Auth/authService';
import TestForm from 'forms/TestForm/TestForm';

const PostContainer: React.FC = () => {
  const { navigateToCreateNickname, navigateToLogin, navigateToUserBlog, navigateToCreatePost, navigateToHome } = useNavigateHelper(); 
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false); // 닉네임 모달 상태
  const [hasNickname, setHasNickname] = useState(false); // 닉네임 보유 여부
  const [myNickname, setMyNickname] = useState<string | null>(null); // 닉네임 상태
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태
  const [logOutModalOpen, setLogOutModalOpen] = useState(false); // 로그아웃 모달 상태
  const [refresh, setRefresh] = useState(false); // 리프레시 상태
  const [blogNickname, setBlogNickname] = useState<string>(''); // 초기 값 빈 문자열
  const [thisPostId, setThisPostId] = useState<string>(''); // 초기 값 빈 문자열
  const [postContent, setPostContent] = useState<any>(null);
  const [isOwner, setisOwner] = useState<boolean>(false);

  // 1번 로직 : 닉네임과 postId로 헤더, 내용 표현하기 위한 필수 데이터
  const { postId, nickname } = useParams<{ postId: string; nickname: string }>();
  
  useEffect(() => {
    console.log("게시글 ID:", postId, "닉네임:", nickname); // 콘솔 로그 추가
    if (nickname) setBlogNickname(nickname); // nickname이 존재할 때만 설정
    if (postId) setThisPostId(postId); // postId가 존재할 때만 설정
    // postId를 이용해 데이터 요청 및 출력 로직 작성
    if (postId) {
      console.log("여기실행은됌?");
      fetchPostById(postId)
      .then(data => {
        setPostContent(data.postList[0]);
        console.log('Fetched Post Data:', data); // fetched data를 콘솔에 출력
      })
      .catch(error => console.error('Error fetching post:', error));
    }
  }, [postId, nickname]);

  // 컴포넌트가 처음 마운트될 때 실행되는 효과
  useEffect(() => {
    console.log("초기 작업하는 곳");
    
    authCheck(
      () => {
        nicknameCheck(
          (nickname) => {
            setHasNickname(true);
            setMyNickname(nickname);
            
            handleCheckPostOwner();
          },
          () => {
            setNicknameModalOpen(true);
          }
        );
      },
      () => {}
    );
  }, [refresh]);

  const handleCheckPostOwner = async () => {
    console.log("여기 오긴오냐?")
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
 
  // 닉네임 모달 확인 클릭 핸들러
  const nicknameModalConfirm = () => {
    navigateToCreateNickname();
  };

  // 로그아웃 핸들러
  const handleLogOut = async () => {
    const result = await combinedLogoutHandler(navigateToHome);
    if (result) {
      setLogOutModalOpen(true);
    }
  };

  // 로그아웃 모달 확인 클릭 핸들러
  const logOutModalConfirm = () => {
    setRefresh(prev => !prev);
    navigateToHome();
  };

  // 헤더 클릭 핸들러
  const handleHeaderClick = () => {
    if (blogNickname) {
      navigateToUserBlog(blogNickname);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <CommonHeaderSection
        title={`${blogNickname || ''}'s blog`}
        onHeaderClick={handleHeaderClick}
        hasNickname={hasNickname} 
        nickname={myNickname} 
        onLoginClick={navigateToLogin} 
        onNicknameClick={() => setDropdownOpen(!dropdownOpen)} 
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
  );
};

export default PostContainer;