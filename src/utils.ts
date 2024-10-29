export const compareDates = (d1: string, d2: string) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    if (date1 > date2) {
      return false;
    } else {
      return true;
    }
  };
  export const formatNumber = (val: string): any => {
    val = val.split("x")[0];
    return val.replace(/[-\s.()]/g, "");
  };
  