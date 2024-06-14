"use client";
import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import ProfileInfo from "@/app/(mainSite)/profile/components/ProfileInfo/ProfileInfo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/userSlice";
import { Button } from "@/components/ui/button";
import EditForm from "@/app/(mainSite)/profile/components/EditForm/EditForm";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/rootReducers";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.UserSlice.user);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
  };
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div className={styles.profile}>
      <BreadCrumb name={"Профиль"} />
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <ProfileInfo />
          <EditForm />
        </div>
      </div>
      <div className={styles.logout}>
        {user ? (
          <Button children={"Выйти"} onClick={handleLogout} />
        ) : (
          <Button children={"Войти"} onClick={handleLogout} />
        )}
      </div>
    </div>
  );
}
