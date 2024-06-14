"use client";

import MainContainer from "@/app/_common/MainContainer/MainContainer";
import { useEffect } from "react";
import { FetchMusic } from "@/redux/slices/musicSlice";
import { useAppDispatch } from "@/redux/hooks";
export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchMusic());
  }, []);
  return <MainContainer />;
}
