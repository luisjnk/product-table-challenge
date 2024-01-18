export type GetResponse<TData> = {
  apiResponse: TData;
};

const get = async <TData>({ url }: { url: string }): Promise<GetResponse<TData>> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Handle non-successful responses
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      apiResponse: data,
    };
  } catch (error) {
    // Handle network errors and other exceptions
    throw new Error('Error during fetch');
  }
};

const FetchHTTP = () => {
  return {
    get,
  };
};

export default FetchHTTP;
