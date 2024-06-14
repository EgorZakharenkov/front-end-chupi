import { BsFillHouseFill, BsJournalAlbum } from "react-icons/bs";
import {
  FaBroadcastTower,
  FaMicrophoneAlt,
  FaPodcast,
  FaUser,
} from "react-icons/fa";

export type MenuList = {
  id: number;
  icon: any;
  name: string;
  link: string;
};

export const menuList: MenuList[] = [
  {
    id: 1,
    icon: <BsFillHouseFill />,
    name: "Главная",
    link: "/",
  },
  {
    id: 4,
    icon: <FaMicrophoneAlt />,
    name: "Артисты",
    link: "/artist",
  },
  {
    id: 3,
    icon: <FaUser />,
    name: "Профиль",
    link: "/profile",
  },
  {
    id: 5,
    icon: <BsJournalAlbum />,
    name: "Альбомы",
    link: "/album",
  },
];
