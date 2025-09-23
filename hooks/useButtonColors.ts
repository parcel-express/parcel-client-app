import { Colors } from '@/constants/Colors';
type ButtonVariant = 'primary' | 'secondary';
export const useButtonColors = (variant: ButtonVariant, disabled?: boolean) => {
  const colorFor = (pressed: boolean) => {
    if (disabled) return Colors.button.disabledText;
    if (pressed) {
      return variant === 'secondary'
        ? Colors.button.secondaryHoverText
        : Colors.button.primaryHoverText;
    }
    return variant === 'secondary' ? Colors.button.secondaryText : Colors.button.primaryText;
  };

  return {
    getIconColor: colorFor,

    getBorderColor: () => {
      if (disabled) return Colors.button.disabledBorder;
      return variant === 'secondary' ? Colors.button.secondaryBorder : Colors.button.primaryBorder;
    },
    getTextColor: colorFor,
  };
};
