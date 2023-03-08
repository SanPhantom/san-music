type SideMenuType = {
  path: string;
  name: string;
  title: string;
};

const menus: SideMenuType[] = [
  {
    path: "/music",
    name: "music",
    title: "发现音乐",
  },
  {
    path: "/video",
    name: "video",
    title: "推荐视频",
  },
];

export default menus;
