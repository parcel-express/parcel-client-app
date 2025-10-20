import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const useTabBarHeight = () => {
  // biome-ignore lint/correctness/useHookAtTopLevel: Hook is called unconditionally; try/catch only guards runtime outside tabs context.
  try {
    return useBottomTabBarHeight();
  } catch {
    return 0;
  }
};
