
export const getSavedTasteIds = () => {
    const savedTasteIds = localStorage.getItem('saved_tastes')
      ? JSON.parse(localStorage.getItem('saved_tastes'))
      : [];
  
    return savedTasteIds;
  };
  
  export const saveTasteIds = (tasteIdArr) => {
    if (tasteIdArr.length) {
      localStorage.setItem('saved_tastes', JSON.stringify(tasteIdArr));
    } else {
      localStorage.removeItem('saved_tastes');
    }
  };
  
  export const removeTasteId = (tasteId) => {
    const savedTasteIds = localStorage.getItem('saved_tastes')
      ? JSON.parse(localStorage.getItem('saved_tates'))
      : null;
  
    if (!savedTasteIds) {
      return false;
    }
  
    const updatedSavedTasteIds = savedTasteIds?.filter((savedTasteId) => 
    //check var name
    savedTasteId !== tasteId);
    localStorage.setItem('saved_tastes', JSON.stringify(updatedSavedTasteIds));
  
    return true;
  };