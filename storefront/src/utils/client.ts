import axios from "axios"

const client = async (url: string, method: string, data: any) => {
  try {
    const response = await axios.request({
      baseURL: "http://localhost:4000",
      url,
      method,
      data,
      headers: {
        Authorization: window.localStorage.getItem('access_token') 
          ? `Bearer ${window.localStorage.getItem('access_token')}`
          : null
      }
    });

    console.log(response)
    return response.data;

  } catch (err) {
    return err
  }
};

export default client