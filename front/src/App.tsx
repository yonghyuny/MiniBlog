// src/App.tsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HeaderProvider } from 'services/HeaderService/HeaderService';
import LoginPage from 'pages/SignInPage/LoginPage';
import OAuth from 'services/OAuth2SignInService/oAuthResponseService';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import CreateNickNamePage from 'pages/CreateNickNamePage/CreateNickNamePage';
import TestUserBlogPage from 'pages/UserBlogPage/TestUserBlogPage';
import TestEditPostPage from 'pages/EditPostPage/TestEditPostPage';
import TestPostPage from 'pages/PostPage/TestPostPage';
import TestDeleteAccountPage from 'pages/DeleteAccountPage/TestDeleteAccountPage';
import TestPage from 'pages/TestPage/TestPage';
import TestMainPage from 'pages/MainPage/TestMainPage';

function App() {
  return (
    <HeaderProvider>
      <Routes>
        <Route path='/auth'>
          <Route path='test' element={<TestPage />} />
          <Route path='log-in' element={<LoginPage />} />
          <Route path='log-up' element={<SignUpPage />} />
          <Route path="create-nickname" element={<CreateNickNamePage />} />
          <Route path="home" element={<TestMainPage />} />
          <Route path="user-blog/:nickname" element={<TestUserBlogPage />} />
          <Route path="edit-post" element={<TestEditPostPage />} />
          <Route path="delete-account" element={<TestDeleteAccountPage />} />
          <Route path="post/:postId/:nickname" element={<TestPostPage />} />
          <Route path='oauth-response/:token/:expirationTime/:refreshToken/:refreshExpirationTime' element={<OAuth />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/home" />} />
      </Routes>
    </HeaderProvider>
  );
}

export default App;