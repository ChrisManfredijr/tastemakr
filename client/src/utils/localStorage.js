
export const getSavedTasteIds = () => {
    const savedTasteIds = localStorage.getItem('saved_taste')
      ? JSON.parse(localStorage.getItem('saved_taste'))
      : [];
  
    return savedTasteIds;
  };
  
  export const saveTasteIds = (artistId) => {
    if (artistId.length) {
      localStorage.setItem('saved_tastes', JSON.stringify(artistId));
    } else {
      localStorage.removeItem('saved_tastes');
    }
  };
  
  export const removeTasteId = (tasteId) => {
    const savedTasteIds = localStorage.getItem('saved_taste')
      ? JSON.parse(localStorage.getItem('saved_tate'))
      : null;
  
    if (!savedTasteIds) {
      return false;
    }
  
    const updatedSavedTasteIds = savedTasteIds?.filter((savedTasteId) => savedTasteId !== tasteId);
    localStorage.setItem('saved_taste', JSON.stringify(updatedSavedTasteIds));
  
    return true;
  };