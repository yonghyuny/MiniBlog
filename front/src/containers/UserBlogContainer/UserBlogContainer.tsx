// src/containers/TestContainer/TestPostContainer.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "components/Modal/Modal";
import CommonHeaderSection from "sections/CommonHeaderSection/CommonHeaderSection";
import CommonDropDownSection from "sections/CommonDropDownSection/CommonDropDownSection";
import { combinedLogoutHandler } from "services/LogOutService/logOutService";
import useNavigateHelper from "utils/NavigationUtil/navigationUtil";
import {
  HeaderProvider,
  useHeader,
} from "services/HeaderService/HeaderService";
import { useAuth } from "hooks/useAuthHook";
import {
  GET_ALL_POST_BY_NICKNAME_URL,
  GET_POST_BY_NICKNAME_20_URL,
} from "utils/APIUrlUtil/apiUrlUtil";
import axios from "axios";
import SidebarList from "components/UserBlogComponent/SidebarList/SidebarList";
import SidebarTitle from "components/UserBlogComponent/SidebarTitle/SidebarTitle";
import CardListTitle from "components/UserBlogComponent/CardListTitle/CardListTitle";
import UserBlogCardForm from "forms/UserBlogCardForm/UserBlogCardForm";

const UserBlogContainer: React.FC = () => {
  const {
    navigateToCreateNickname,
    navigateToLogin,
    navigateToUserBlog,
    navigateToCreatePost,
    navigateToHome,
  } = useNavigateHelper(); // 네비게이션 헬퍼 함수들
  const { dropdownOpen, toggleDropdown } = useHeader(); // 헤더 드롭다운 상태 및 토글 함수
  const [logOutModalOpen, setLogOutModalOpen] = useState(false); // 로그아웃 모달 상태
  const [refresh, setRefresh] = useState(false); // 데이터 새로고침 상태
  const [blogNickname, setBlogNickname] = useState<string>(""); // 블로그 닉네임 상태
  const [postList, setPostList] = useState<any[]>([]); // 게시글 목록 상태
  const [postCardList, setPostCardList] = useState<any[]>([]); // 게시글 카드 상태
  const { nickname } = useParams<{ nickname: string }>(); // URL 파라미터에서 닉네임 추출
  const { hasNickname, myNickname, nicknameModalOpen, setNicknameModalOpen } =
    useAuth(); // 인증 관련 훅에서 상태 및 함수들
  const [page, setPage] = useState<number>(0); // 페이지 번호 상태

  // 닉네임이 URL 파라미터에서 변경될 때 블로그 닉네임 설정
  useEffect(() => {
    console.log("닉네임:", nickname);
    if (nickname) setBlogNickname(nickname);
  }, [nickname]);

  // 블로그 닉네임이 변경되거나 새로고침 상태가 변경될 때 게시글 목록을 가져옴
  useEffect(() => {
    const postlistByNickname = async () => {
      try {
        console.log("실행됌?" + blogNickname);
        const response = await axios.post(GET_ALL_POST_BY_NICKNAME_URL(), {
          nickname: blogNickname,
        });
        console.log("API 응답:", response.data);
        setPostList(response.data.postList || response.data.posts || []); // 유효한 데이터 확인
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    if (blogNickname) {
      postlistByNickname();
    }
  }, [blogNickname, refresh]);

  // postList가 업데이트될 때마다 로그 출력
  // 잘들어오는지 확인용 삭제하셔도댐
  useEffect(() => {
    // console.log("여기는? " + JSON.stringify(postList)); // postList가 업데이트될 때마다 로그 출력
  }, [postList]);

  const getAllPostsByNicknamePaged = async (nickname: string, page: number) => {
    try {
      const response = await axios.post(
        `${GET_POST_BY_NICKNAME_20_URL()}`,
        { nickname },
        {
          params: { page },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching posts by nickname with pagination:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPagedPosts = async () => {
      if (blogNickname) {
        const data = await getAllPostsByNicknamePaged(blogNickname, page);
        console.log("페이지네이션 API 응답:", data);
        setPostCardList(data?.postList || data?.posts || []); // 유효한 데이터 확인 후 설정
      }
    };
    fetchPagedPosts();
  }, [blogNickname, page]);

  useEffect(() => {
    console.log("카드형식 데이터 20개" + postCardList); // postList가 업데이트될 때마다 로그 출력
  }, [postCardList]);

  /////////////////////////////////////////////////////////////////// 공통로직
  // 닉네임 모달 확인 버튼 클릭 시 호출되는 함수
  const nicknameModalConfirm = () => {
    navigateToCreateNickname();
  };

  // 로그아웃 버튼 클릭 시 호출되는 함수
  const handleLogOut = async () => {
    const result = await combinedLogoutHandler(navigateToHome);
    if (result) {
      setLogOutModalOpen(true); // 로그아웃 모달 열기
    }
  };

  // 로그아웃 모달 확인 버튼 클릭 시 호출되는 함수
  const logOutModalConfirm = () => {
    setRefresh((prev) => !prev); // 새로고침 상태 변경
    navigateToHome();
  };

  // 헤더 클릭 시 호출되는 함수
  const handleHeaderClick = () => {
    if (blogNickname) {
      navigateToUserBlog(blogNickname);
    }
  };

  return (
    <HeaderProvider>
      <div className="max-w-screen-2xl mx-auto">
        <CommonHeaderSection
          title={`${blogNickname || ""}'s blog`}
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

        <div className="flex justify-between bg-[#FBF7F0] ">
          {/* -----------------------  section으로 합쳐서 하면 게시글 목록도 같이 맵이 적용되서 계속 뜸....ㅜㅜ */}
          <div className="w-80  p-4 ">
            <SidebarTitle text="게시글 목록" />
            {postList.map((post) => (
              <SidebarList key={post.postId} title={post.title} />
            ))}
          </div>
          {/* -----------------------   */}
          <div className="w-3/4">
            <CardListTitle listTitle="게시글 카드 목록" />
            <div>
              {postCardList.map((post) => (
                <UserBlogCardForm
                  key={post.postId}
                  title={post.title}
                  content={post.content}
                  createdAt={post.createdAt}
                  commentCount={post.commentCount}
                  likeCount={post.likeCount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </HeaderProvider>
  );
};

export default UserBlogContainer;
