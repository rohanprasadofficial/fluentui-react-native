export const MIN_WIDTH = 112;
export const MAX_WIDTH = 280;

const getDisabledColor = () => {
  return 'red';
};

const getTitleColor = ({ disabled }: any) => {
  if (disabled) {
    return getDisabledColor();
  }

  return 'red';
};

export const getMenuItemColor = ({ disabled }: any) => {
  return {
    titleColor: getTitleColor({ disabled }),
    iconColor: 'red',
    underlayColor: 'red',
  };
};

export const getContentMaxWidth = () => {
  return MAX_WIDTH - 16;
};
