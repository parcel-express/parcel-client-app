import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const useTabBarHeight = () => {
  try {
    return useBottomTabBarHeight();
  } catch {
    return 0;
  }
};
