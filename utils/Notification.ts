export function Notification() {

  const notfSuccess = (title: string, msg: string) => {
    ElMessage({
      message: `${title} - ${msg}`,
      type: 'success',
    })
  };

  const notfError = (title: string, msg: string) => {
    ElMessage({
      message: `${title} - ${msg}`,
      type: 'error',
    })
  };

  const notfWarn = (title: string, msg: string) => {
    ElMessage({
      message: `${title} - ${msg}`,
      type: 'warning',
    })
  }

  return {
    notfSuccess,
    notfError,
    notfWarn,
  };
}
