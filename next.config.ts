import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/art",
        destination: "/fun?category=drawings",
        permanent: true,
      },
      {
        source: "/art/:slug",
        destination: "/fun/drawings/:slug",
        permanent: true,
      },
      {
        source: "/notes",
        destination: "/fun?category=writing",
        permanent: true,
      },
      {
        source: "/notes/:slug",
        destination: "/fun/writing/:slug",
        permanent: true,
      },
      {
        source: "/lab",
        destination: "/fun?category=dev",
        permanent: true,
      },
      {
        source: "/lab/:slug",
        destination: "/fun/dev/:slug",
        permanent: true,
      },
      {
        source: "/en/art",
        destination: "/en/fun?category=drawings",
        permanent: true,
      },
      {
        source: "/en/art/:slug",
        destination: "/en/fun/drawings/:slug",
        permanent: true,
      },
      {
        source: "/en/notes",
        destination: "/en/fun?category=writing",
        permanent: true,
      },
      {
        source: "/en/notes/:slug",
        destination: "/en/fun/writing/:slug",
        permanent: true,
      },
      {
        source: "/en/lab",
        destination: "/en/fun?category=dev",
        permanent: true,
      },
      {
        source: "/en/lab/:slug",
        destination: "/en/fun/dev/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
