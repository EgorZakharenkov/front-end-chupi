"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.scss";
import {
  FaBackward,
  FaForward,
  FaHeart,
  FaPause,
  FaPlay,
  FaRegHeart,
  FaShareAlt,
} from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  NextTrack,
  PrevTrack,
  SetCurrentTrack,
} from "@/redux/slices/musicSlice";
import Image from "next/image";

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioPlayer = useRef<HTMLAudioElement | any>();
  const progressBar = useRef<HTMLInputElement | any>(null);
  const animationRef = useRef<number | any>(null);
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.MusicSlice.musics.item);

  useEffect(() => {
    const second = Math.floor(audioPlayer?.current?.duration);
    setDuration(second);
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const CalculateTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin}:${returnSec}`;
  };
  useEffect(() => {
    dispatch(SetCurrentTrack(audioPlayer.current));
  }, [item]);
  useEffect(() => {
    if (item) {
      audioPlayer.current.play();
      setIsPlaying(true);
      progressBar.current.value = String(audioPlayer.current.currentTime);
      animationRef.current = requestAnimationFrame(whilePlaying);
      if (audioPlayer.current.duration !== 0) {
        if (currentTime == Math.floor(audioPlayer.current.duration)) {
          dispatch(NextTrack());
        }
      }
    }
  }, [item, duration, currentTime]);

  const ChangePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };
  const whilePlaying = () => {
    if (audioPlayer.current) {
      progressBar.current.value = String(audioPlayer.current?.currentTime);
      changeCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };
  const changeProgress = () => {
    audioPlayer.current.currentTime = Number(progressBar.current?.value);
    changeCurrentTime();
  };
  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--player-played",
      `${(Number(progressBar.current.value) / duration) * 100}%`,
    );
    setCurrentTime(Number(progressBar.current?.value));
  };
  const ChangePrevTrack = () => {
    dispatch(PrevTrack());
  };
  const ChangeNextTrack = () => {
    dispatch(NextTrack());
  };
  return (
    <>
      {item !== null ? (
        <div className={styles.content}>
          <div className={styles.bg}>
            <img
              src={
                item.imgSong.includes("http")
                  ? item.imgSong
                  : `https://back-end-chupi-production.up.railway.app/${item.imgSong}`
              }
              className={styles.bg_image}
              alt={item.imgSong}
            />

            <div className={styles.MusicPlayer}>
              <div className={styles.songImg}>
                <img
                  width={120}
                  height={80}
                  className={isPlaying ? styles.rot : ""}
                  src={
                    item.imgSong.includes("http")
                      ? item.imgSong
                      : `https://back-end-chupi-production.up.railway.app/${item.imgSong}`
                  }
                  alt={item.imgSong}
                />
              </div>
              <div className={styles.songAttributes}>
                <audio
                  src={
                    item.song.includes("http")
                      ? item.song
                      : `https://back-end-chupi-production.up.railway.app/${item.song}`
                  }
                  ref={audioPlayer as React.RefObject<HTMLAudioElement>}
                  preload="metadata"
                ></audio>
                <div className={styles.top}>
                  <div className={styles.left}>
                    <div className={styles.songInfo}>
                      <span>{item.songName}</span>
                      <p>{item.artist}</p>
                    </div>

                    <a href={item.song} className={styles.download}>
                      <i>
                        <BsDownload />
                      </i>
                    </a>
                    <div>
                      {item.favorite ? (
                        <i>
                          <FaHeart />
                        </i>
                      ) : (
                        <i>
                          <FaRegHeart />
                        </i>
                      )}
                    </div>
                  </div>
                  <div className={styles.middle}>
                    <div className={styles.back}>
                      <i>
                        <FaBackward onClick={() => ChangePrevTrack()} />
                      </i>
                    </div>
                    <div
                      onClick={() => ChangePlayPause()}
                      className={styles.PlayPause}
                    >
                      {!isPlaying ? (
                        <i>
                          <FaPlay />
                        </i>
                      ) : (
                        <i>
                          <FaPause />
                        </i>
                      )}
                    </div>
                    <div className={styles.next}>
                      <i>
                        <FaForward onClick={() => ChangeNextTrack()} />
                      </i>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <i>
                      <FaShareAlt />
                    </i>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.currentTime}>
                    {CalculateTime(currentTime)}
                  </div>
                  <input
                    min="0"
                    max={duration}
                    type="range"
                    ref={progressBar}
                    onChange={changeProgress}
                  />
                  <div className={styles.duration}>
                    {duration ? CalculateTime(duration) : item.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default MusicPlayer;
