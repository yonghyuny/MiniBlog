import React from 'react';
import CreateNickNameForm from 'forms/CreateNickNameForm/CreateNickNameForm';

const CreateNickNameContainer: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <CreateNickNameForm />
    </div>
  );
};

export default CreateNickNameContainer;
