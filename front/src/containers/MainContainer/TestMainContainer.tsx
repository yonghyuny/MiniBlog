// src/containers/TestContainer/TestCommonLogicContainer.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Modal from 'components/Modal/Modal';
import CommonHeaderSection from 'sections/CommonHeaderSection/CommonHeaderSection';
import CommonDropDownSection from 'sections/CommonDropDownSection/CommonDropDownSection';
import { combinedLogoutHandler } from 'services/LogOutService/logOutService';
import useNavigateHelper from 'utils/NavigationUtil/navigationUtil';
import { getAllPosts } from 'services/Auth/authService';
import MainCardForm from 'forms/MainCardForm/MainCardForm';
import { HeaderProvider, useHeader } from 'services/HeaderService/HeaderService';
import { useAuth } from 'hooks/useAuthHook';

  const TestMainContainer: React.FC = () => {
    const { navigateToCreateNickname, navigateToLogin, navigateToUserBlog, navigateToCreatePost, navigateToHome, navigateToPost } = useNavigateHelper();
    const { dropdownOpen, toggleDropdown } = useHeader();
    const { hasNickname, myNickname, nicknameModalOpen, setNicknameModalOpen } = useAuth();
    const [logOutModalOpen, setLogOutModalOpen] = useState(false); // 로그아웃 모달 상태
    const [refresh, setRefresh] = useState(false); // 리프레시 상태
    const [posts, setPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 확인
    const observerRef = useRef<IntersectionObserver | null>(null); // 옵저버 레퍼런스
    const loadMoreRef = useRef<HTMLDivElement | null>(null); // 더 가져오기 레퍼런스

    type PostData = { // allpost 데이터 타입
      postList?: any[];
    };

    const isValidPostList = (data: PostData) => { // allpost 데이터 더 있는지 없는지
      return data && data.postList && Array.isArray(data.postList) && data.postList.length > 0;
    };

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

    useEffect(() => {
      console.log("초기 작업하는 곳");
      fetchPosts(0);
    }, [refresh, fetchPosts]);

    const handleHeaderClick = () => {
      navigateToHome();
    };

    useEffect(() => {
      if (isLoading || !hasMore) return;

      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
      }
      observerRef.current = observer;

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }, [isLoading, hasMore]);

    useEffect(() => {
      if (page > 0) {
        fetchPosts(page);
      }
    }, [page, fetchPosts]);

    const handlePostClick = (postId: number, nickname: string) => {
      console.log(`게시글 ID : ${postId} / 유저 닉네임 : ${nickname}`);
      navigateToPost(postId, nickname);
    };

    const handleNicknameClick = (nickname: string) => {
      console.log("닉네임:", nickname);
      navigateToUserBlog(nickname);
    };

    return (
      <HeaderProvider>
        <div className="max-w-screen-2xl mx-auto">
          <CommonHeaderSection
            title={"MiniBlog"}
            hasNickname={hasNickname}
            nickname={myNickname}
            onHeaderClick={handleHeaderClick}
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

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {posts.map(post => (
              <MainCardForm
                key={post.postId}
                postId={post.postId}
                nickname={post.nickname}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                commentsCount={post.comments.length}
                likeCount={post.likeCount}
                imageUrl={'https://velog.velcdn.com/images/480/post/7e9b251b-96f1-4a61-a0c4-869615adf79e/image.png'} // 이미지 URL
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
          />
                
        </div>
      </HeaderProvider>
    );
  };

  export default TestMainContainer;
