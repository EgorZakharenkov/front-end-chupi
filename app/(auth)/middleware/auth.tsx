import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducers";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const user = useSelector(
      (state: RootState) => state.UserSlice.user?.userData,
    );

    if (!user) {
      router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
