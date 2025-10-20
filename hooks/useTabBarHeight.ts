import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const useTabBarHeight = () => {
  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: Hook is called unconditionally; try/catch only guards runtime outside tabs context.
    return useBottomTabBarHeight();
  } catch {
    return 0;
  }
};
