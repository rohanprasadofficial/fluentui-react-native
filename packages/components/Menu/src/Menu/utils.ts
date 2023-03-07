export const MIN_WIDTH = 112;
export const MAX_WIDTH = 280;

const getDisabledColor = () => {
  return 'red';
};

const getTitleColor = ({ disabled }: any) => {
  if (disabled) {
    return getDisabledColor();
  }

  return 'white';
};

export const getMenuItemColor = ({ disabled }: any) => {
  return {
    titleColor: getTitleColor({ disabled }),
    iconColor: 'white',
    underlayColor: 'white',
  };
};

export const getContentMaxWidth = () => {
  return MAX_WIDTH - 16;
};
