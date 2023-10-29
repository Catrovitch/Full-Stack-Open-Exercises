import React, { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationStyle: React.CSSProperties = {
    color: "red",
  };

  return (
    visible && (
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
