module.exports = {
  async rewrites() {
    return [
      {
        source: "/files/:path*",
        destination: "http://localhost:3000/files/:path*", // Замените на ваш хост и порт
      },
    ];
  },
  images: {
    disableStaticImages: true,
    domains: [
      "is5-ssl.mzstatic.com",
      "i.scdn.co",
      "images.genius.com",
      "avatars.yandex.net",
      "i.ytimg.com",
      "static.wikia.nocookie.net",
      "i1.sndcdn.com",
      "localhost",
    ],
  },
};
