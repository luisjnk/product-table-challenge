import FetchHTTP from '../../http/fetch-http-service';
import ProductHTTP from '../product-http-service';

// Mocking the FetchHTTP module
jest.mock('../../http/fetch-http-service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ProductHTTP', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mocked products' });
    (FetchHTTP as jest.Mock).mockImplementationOnce(() => ({
      get: mockGet,
    }));

    const result = await ProductHTTP().getProducts({ page: 1, pageSize: 10 });

    expect(mockGet).toHaveBeenCalledWith({ url: 'https://orders-api.qa.shalion.com/v1/offers?page=1&pageSize=10' });
    expect(result).toEqual({ data: 'mocked products' });
  });

  it('should handle server error', async () => {
    const mockGet = jest.fn().mockRejectedValue({ response: { data: 'Server error' } });
    (FetchHTTP as jest.Mock).mockImplementationOnce(() => ({
      get: mockGet,
    }));

    await expect(ProductHTTP().getProducts({ page: 1, pageSize: 10 })).rejects.toThrow('Server error');
  });

  it('should handle no response received error', async () => {
    const mockGet = jest.fn().mockRejectedValue({ request: 'No response received' });
    (FetchHTTP as jest.Mock).mockImplementationOnce(() => ({
      get: mockGet,
    }));

    await expect(ProductHTTP().getProducts({ page: 1, pageSize: 10 })).rejects.toThrow('No response received from the server');
  });

  it('should handle general HTTP error', async () => {
    const mockGet = jest.fn().mockRejectedValue(new Error('General HTTP error'));
    (FetchHTTP as jest.Mock).mockImplementationOnce(() => ({
      get: mockGet,
    }));

    await expect(ProductHTTP().getProducts({ page: 1, pageSize: 10 })).rejects.toThrow('Failed to fetch products');
  });
});
