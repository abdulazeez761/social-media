export const checkNullability = (param?: string) => {
  return (
    param != null &&
    param != '' &&
    param != 'null' &&
    param != 'undefined' &&
    param != undefined &&
    isNaN(+param)
  );
};
