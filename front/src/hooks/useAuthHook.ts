

// src/hooks/useAuthHook.ts
import { useState, useEffect } from 'react';
import { authCheck } from 'services/Auth/test_authCheckService';
import { nicknameCheck } from 'services/Auth/test_nicknameCheckService';

export const useAuth = (onAuthSuccess?: (nickname: string) => void) => {
  const [hasNickname, setHasNickname] = useState(false);
  const [myNickname, setMyNickname] = useState<string | null>(null);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);

  useEffect(() => {
    authCheck(
      () => {
        nicknameCheck(
          (nickname) => {
            setHasNickname(true);
            setMyNickname(nickname);
            if (onAuthSuccess) {
              onAuthSuccess(nickname);
            }
          },
          () => {
            setNicknameModalOpen(true);
          }
        );
      },
      () => {}
    );
  }, [onAuthSuccess]);

  return { hasNickname, myNickname, nicknameModalOpen, setNicknameModalOpen };
};