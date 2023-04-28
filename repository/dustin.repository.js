import trashRequest from "../models/trashRequest.js";

export const createDustbinRequest = async (data) => {
    try {
      const newRequest = await trashRequest.create(data);
      return [null, newRequest];
    } catch (error) {
      let errObj = {
        code: 500,
        message: `Internal Server Error: ${error.message}`,
      };
      return [errObj, null];
    }
  };