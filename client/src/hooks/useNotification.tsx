import { useState, useMemo } from "react";
import { Notification } from "@/components/notification";

type NotificationStatus = "info" | "error" | "success";

interface NotificationProps {
  message: string;
  status: NotificationStatus;
}

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProps, setNotificationProps] = useState<NotificationProps>(
    {
      message: "",
      status: "info",
    },
  );

  const notificationComponent = useMemo(
    () =>
      showNotification && (
        <Notification
          message={notificationProps.message}
          status={notificationProps.status}
        />
      ),
    [showNotification, notificationProps],
  );

  return {
    showNotification,
    setShowNotification,
    notificationProps,
    setNotificationProps,
    notificationComponent,
  };
};
