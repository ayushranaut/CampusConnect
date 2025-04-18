import PostCard from "@/components/PostCard";
import { ProfileCard } from "@/components/ProfileCard";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/AuthStore/useAuthStore";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Post, IUser } from "@/lib/utils";
import { motion } from "framer-motion"
import { routeVariants } from "@/lib/routeAnimation";
import SettingsIcon from "@/icons/SettingsIcon";

export const Profile = () => {
  const { id } = useParams();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const { authUser } = useAuthStore();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const userId = authUser?._id;
  const [isLoading, setIsLoading] = useState(true);

  const isAdminView = location.pathname.includes("/admin");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let url;
        if (isAdminView) {
          url = id ? `/admin/view-profile/${id}` : "/admin/view-profile";
        } else {
          url = id ? `/user/viewProfile/${id}` : "/user/viewProfile";
        }

        const response = await axiosInstance(url);
        const profileData = response.data.userInfo;
        setUserInfo(profileData);

        const isOwn =
          response.data.isOwnProfile ||
          (profileData && userId && profileData._id === userId);
        setIsOwnProfile(isOwn);
      } catch (e) {
        console.error("Error fetching profile", e);
      }
    };

    const fetchUserPosts = async () => {
      setIsLoading(true);
      try {
        let url;
        if (isAdminView) {
          url = id ? `/admin/view-posts/${id}` : "/admin/view-posts/myPosts";
        } else {
          url = id ? `/post/viewPosts/${id}` : "/post/viewPosts/myPosts";
        }
    
        const postResponse = await axiosInstance(url);
        setUserPosts(postResponse.data);
      } catch (e) {
        console.error("Error fetching user posts", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
    fetchUserPosts();
  }, [id, userId, isAdminView]);

  return (
    <motion.div 
      className="flex gap-6 p-4 w-full min-h-screen bg-gray-50 dark:bg-neutral-950 dark:border-neutral-900 dark:shadow-0 dark:shadow-sm"
      variants={routeVariants}
      initial="initial"
      animate="final"
      exit="exit"  
    >
      
      <div className="hidden lg:block w-1/4 max-w-xs">
        <div className="sticky top-20">
          {userInfo && (
            <ProfileCard
              userInfo={userInfo}
              isOwnProfile={isOwnProfile}
              isAdmin={isAdminView}
            />
          )}
        </div>
      </div>
      
      <div className="flex-1 max-w-2xl mx-auto translate-y-28 lg:translate-y-20 ">
        <div className="lg:hidden block fixed right-0 -translate-y-10  ">
          <Link to={"/settings"} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
            <SettingsIcon
              className={`w-6 h-6`}
            />
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-6 translate-y-4 dark:bg-neutral-800 dark:border-neutral-900 dark:shadow-0 dark:shadow-sm">
          <h1 className="text-2xl font-bold mb-4">
            {isOwnProfile
              ? isAdminView
                ? "My Admin Dashboard"
                : "My Posts"
              : userInfo
              ? `${userInfo.name}'s ${
                  isAdminView ? "Profile (Admin View)" : "Profile"
                }`
              : "Profile"}
          </h1>
          
          {isLoading ? (
            <p className="text-gray-500 text-center py-8 ">Loading posts...</p>
          ) : userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} isAdmin={isAdminView} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No posts available.</p>
          )}
        </div>
      </div>
      
      <div className="hidden lg:block w-1/4 max-w-xs"></div>
    </motion.div>
  );
};