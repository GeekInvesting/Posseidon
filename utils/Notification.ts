export function Notification() {
  const duration = 5000;
  const position = "bottom-right"

  const notfSuccess = (title: string, msg: string) => {
    ElNotification({
      title: title,
      message: msg,
      type: "success",
      duration: duration,
      position: position,
    });
  };

  const notfError = (title: string, msg: string) => {
    ElNotification({
      title: title,
      message: msg,
      type: "error",
      duration: duration,
      position: position,
    });
  };

  return {
    notfSuccess,
    notfError,
  };
}
