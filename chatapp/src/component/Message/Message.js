import React from 'react';
import './Message.css';

export const Message = ({user, message, msgClass}) => {

if(user){
    return (
        <div className={`messageBox ${msgClass}`}>
            {`${user}: ${message}`}
        </div>
    )
}
else {
  return (
  <div className={`messageBox ${msgClass}`}>
      {`You: ${message}`}
  </div>
  );
}
};

export default Message