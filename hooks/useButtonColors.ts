import { ButtonProps } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';

export const useButtonColors = (variant: ButtonProps['variant'], disabled?: boolean) => {
  return {
    getIconColor: (pressed: boolean) => {
      if (disabled) return Colors.button.disabledText;
      if (pressed) {
        return variant === 'secondary'
          ? Colors.button.secondaryHoverText
          : Colors.button.primaryHoverText;
      }
      return variant === 'secondary' ? Colors.button.secondaryText : Colors.button.primaryText;
    },
    getBorderColor: () => {
      if (disabled) return Colors.button.disabledBorder;
      return variant === 'secondary' ? Colors.button.secondaryBorder : Colors.button.primaryBorder;
    },
    getTextColor: (pressed: boolean) => {
      if (disabled) return Colors.button.disabledText;
      if (pressed) {
        return variant === 'secondary'
          ? Colors.button.secondaryHoverText
          : Colors.button.primaryHoverText;
      }
      return variant === 'secondary' ? Colors.button.secondaryText : Colors.button.primaryText;
    },
  };
};
