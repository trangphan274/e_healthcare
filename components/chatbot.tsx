'use client'
import React, { useEffect } from "react";

interface ChatBotProps {
  appId: string; // Kommunicate App ID
  popupWidget?: boolean; // Có tự động hiển thị hộp chat hay không
  automaticChatOpenOnNavigation?: boolean; // Tự động mở chat khi chuyển trang
}

const ChatBot: React.FC<ChatBotProps> = ({
  appId,
  popupWidget = true, // Mặc định hiển thị nút bật chat
  automaticChatOpenOnNavigation = true, // Mặc định tự động mở chat
}) => {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: appId,
        popupWidget: popupWidget,
        automaticChatOpenOnNavigation: automaticChatOpenOnNavigation,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }, [appId, popupWidget, automaticChatOpenOnNavigation]);

  return null; // Không cần giao diện, widget tự quản lý
};

export default ChatBot;
