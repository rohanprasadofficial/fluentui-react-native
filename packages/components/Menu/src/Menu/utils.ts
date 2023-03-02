export const MIN_WIDTH = 112;
export const MAX_WIDTH = 280;

type ContentProps = {
  isV3: boolean;
  iconWidth: number;
  leadingIcon?: any;
  trailingIcon?: any;
};

const getDisabledColor = (theme: any) => {
  if (theme.isV3) {
    return theme.colors.onSurfaceDisabled;
  }

  return '#ffffff';
};

const getTitleColor = ({ theme, disabled }: any) => {
  if (disabled) {
    return getDisabledColor(theme);
  }

  return 'red';
};

export const getMenuItemColor = ({ theme, disabled }: any) => {
  return {
    titleColor: getTitleColor({ theme, disabled }),
    iconColor: 'red',
    underlayColor: 'red',
  };
};

export const getContentMaxWidth = ({ isV3, iconWidth, leadingIcon, trailingIcon }: ContentProps) => {
  if (isV3) {
    if (leadingIcon && trailingIcon) {
      return MAX_WIDTH - (2 * iconWidth + 24);
    }

    if (leadingIcon || trailingIcon) {
      return MAX_WIDTH - (iconWidth + 24);
    }

    return MAX_WIDTH - 12;
  }

  if (leadingIcon) {
    return MAX_WIDTH - (iconWidth + 48);
  }

  return MAX_WIDTH - 16;
};
