import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Loading;