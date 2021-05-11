const API_ENDPOINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";


const request = async url => {
  try {
      const response = await fetch(url);
      const data = response.json();
      return data;
  } catch(e) {
      throw new Error("Error 발생!")
  }
};

export const api = {
  root: async () => {
    try{
      const resp = await request(`${API_ENDPOINT}`)
      return {
        success: true,
        data : resp
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.toString()
      }
    }
    
  },
  specific: async id => {
    try{
      const resp = await request(`${API_ENDPOINT}/${id}`)
      return {
        success: true,
        data : resp
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.toString()
      }
    }
  }
};