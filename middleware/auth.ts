import { validToken } from "~/utils/service/atena/AuthService";

const directSignin = (msg: string) => {
  const router = useRouter();

  router.push("/auth/signin");
  Notif().notfWarn("Attention", msg);
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const directHome = (msg: string) => {
  const router = useRouter();

  router.push("/");
  Notif().notfWarn("Attention", msg);
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

export default defineNuxtRouteMiddleware((to, from) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (process.client) {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
          directSignin('Restricted area, please login');
          resolve();
          return;
        }

        const valid = await validToken();

        if (valid.status === 401) {
          directSignin('Session expired, please login again');
          resolve();
          return;
        }

        const validUser = await valid.json();

        if (to.path.includes('/admin') && validUser.userRole !== 'admin') {
          directHome('Restricted area, please login');
          resolve();
          return;
        }
      }
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
});
