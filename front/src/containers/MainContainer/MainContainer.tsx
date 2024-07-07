//src/containers/TestContainer/TestCommonLogicContainer
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Modal from 'components/Modal/Modal';
import CommonHeaderSection from 'sections/CommonHeaderSection/CommonHeaderSection';
import CommonDropDownSection from 'sections/CommonDropDownSection/CommonDropDownSection';
import { authCheck } from 'services/Auth/test_authCheckService';
import { nicknameCheck } from 'services/Auth/test_nicknameCheckService';
import { combinedLogoutHandler } from 'services/LogOutService/logOutService';
import useNavigateHelper from 'utils/NavigationUtil/navigationUtil';
import { getAllPosts } from 'services/Auth/authService';
import MainCardForm from 'forms/MainCardForm/MainCardForm';

const MainContainer: React.FC = () => {
  const { navigateToCreateNickname, navigateToLogin, navigateToUserBlog, navigateToCreatePost, navigateToHome, navigateToPost } = useNavigateHelper(); 
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false); // 닉네임 모달 상태
  const [hasNickname, setHasNickname] = useState(false); // 닉네임 보유 여부
  const [myNickname, setMyNickname] = useState<string | null>(null); // 닉네임 상태
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태
  const [logOutModalOpen, setLogOutModalOpen] = useState(false); // 로그아웃 모달 상태
  const [refresh, setRefresh] = useState(false); // 리프레시 상태
  const [posts, setPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 확인
  const observerRef = useRef<IntersectionObserver | null>(null); // 옵저버 레퍼런스
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 더 가져오기 레퍼런스

  //////////////////////////////////////////////////////////////////////////////////////////
  type PostData = { // allpost 데이터 타입
    postList?: any[];
  };
  

  const isValidPostList = (data:PostData) => { // allpost 데이터 더 있는지 없는지
    return data && data.postList && Array.isArray(data.postList) && data.postList.length > 0;
  };

  // 게시글 데이터를 가져오는 함수
  const fetchPosts = useCallback(async (page: number) => {
    setIsLoading(true); // 로딩 시작
    const data = await getAllPosts(page); // 최신 게시글 40개 요청
    if (isValidPostList(data)) { // 데이터가 있다면
      setPosts(prevPosts => (page === 0 ? data.postList : [...prevPosts, ...data.postList]));
    } else { // 데이터가 없다면
      setHasMore(false); 
      console.log('No more data available.');
    }
    setIsLoading(false); // 로딩 끝
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////


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
  

  // 컴포넌트가 처음 마운트될 때 실행되는 효과
  useEffect(() => {
    console.log("초기 작업하는 곳");

    fetchPosts(0);

    authCheck( // 인증검사
      () => { // 인증성공
        nicknameCheck( // 닉네임 유무
          (nickname) => { // 닉네임 유
            setHasNickname(true); // 닉네임 보유 상태 true
            setMyNickname(nickname); // 닉네임 정보 저장
          },
          () => { // 닉네임 무
            setNicknameModalOpen(true); // 닉네임 경고 모달
          }
        );
      },
      () => { }// 인증 실패
    );
  }, [refresh, fetchPosts]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 페이지를 감시하고 스크롤이 끝에 도달했을 때 페이지 번호 증가
  useEffect(() => {
    if (isLoading || !hasMore) return; // 이미 로딩 중이거나 더 이상 가져올 데이터가 없으면 새로운 요청을 하지 않음

    // IntersectionObserver를 사용하여 loadMoreRef가 화면에 보일 때 페이지 번호를 증가시킴
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1); // 페이지 번호를 1 증가시킴
      }
    });

    if (loadMoreRef.current) { // loadMoreRef 요소를 옵저버에 등록
      observer.observe(loadMoreRef.current);
    }
    observerRef.current = observer; // 옵저버를 레퍼런스에 저장

    return () => {
      if (observerRef.current) { // 컴포넌트가 언마운트될 때 옵저버 연결 해제
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, hasMore]);  // isLoading, hasMore 상태가 변경될 때마다 이 useEffect가 실행됨

  // 페이지가 변경될 때마다 새로운 게시글 데이터 가져오기
  useEffect(() => {
    if (page > 0) {
      fetchPosts(page);
    }
  }, [page, fetchPosts]);



   // 게시글 클릭 핸들러
  const handlePostClick = (postId: number, nickname: string) => {
    console.log(`게시글 ID : ${postId} / 유저 닉네임 : ${nickname}`);
    navigateToPost(postId, nickname);
  };

  // 닉네임 클릭 핸들러
  const handleNicknameClick = (nickname: string) => {
    console.log("닉네임:", nickname);
    navigateToUserBlog(nickname)
  };
  // 헤더 클릭 핸들러
  const handleHeaderClick = () => {
    navigateToHome();
  };
  


  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* <CommonHeaderSection 
        title={"MiniBlog"}
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {posts.map(post => (
          <MainCardForm
          key={post.postId}
          postId={post.postId}
          nickname={post.nickname}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          commentsCount={post.comments.length} // 댓글 개수
          likeCount={post.likeCount} // 좋아요 개수
          // imageUrl={'https://velog.velcdn.com/images/480/post/7e9b251b-96f1-4a61-a0c4-869615adf79e/image.png'} // 이미지 URL
          // imageUrl={'https://velog.velcdn.com/images/sebanim/post/49f4a399-bd04-4070-9f9e-076752fc5ff8/image.png'} // 이미지 URL
          // imageUrl={'https://velog.velcdn.com/images/sebanim/post/fb5f8614-18a9-45cf-bebe-89a746ef0497/image.png'} // 이미지 URL
            onPostClick={handlePostClick}
            onNicknameClick={handleNicknameClick}
          />
        ))} 
      </div>
      <div ref={loadMoreRef} className="h-10"></div>

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
      /> */}
    </div>
  );
};

export default MainContainer;
