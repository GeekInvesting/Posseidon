
export class UnauthorizedError {
  directUnauthorized(msg: string) {
    const router = useRouter();

    router.push("/auth/signin");
    PosseidonNotif("error", msg)
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
