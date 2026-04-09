const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qeuyppispekujnvabnto.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
