import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-red-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Dual Color Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute w-full h-full border-4 border-t-red-500 border-b-red-300 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          <div className="absolute w-8 h-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-t-red-300 border-b-red-500 border-l-transparent border-r-transparent rounded-full animate-spin-slow"></div>
        </div>

        {/* Animated Text */}
        <motion.p
          className="text-red-600 font-semibold tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.2,
          }}
        >
          Loading, please wait...
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
