import { notifTitle } from "~/@types/PosseidonTipes";

export function Notif() {

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


export const PosseidonNotif = (title: notifTitle, msg: string) => {
  ElMessage({
    message: `${msg}`,
    type: `${title}`,
  })
}
