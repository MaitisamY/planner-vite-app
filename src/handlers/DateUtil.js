export const formatDateToInput = (dateString) => {
    if (!dateString) return null;
  
    const date = new Date(dateString + ' UTC');
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
};

export const formatDateToOriginalFormat = (dateString) => {
    if (!dateString) return null;
  
    const date = new Date(dateString);
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${date.getDate()} ${year}`;
  };
  
  