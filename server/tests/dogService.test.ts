import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService - getRandomDogImage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return imageUrl and success status from mocked Dog API response', async () => {
    const mockedDogApiResponse = {
      message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
      status: 'success'
    };

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(mockedDogApiResponse)
    } as unknown as Response);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockedDogApiResponse.message);
    expect(result.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('should reject and throw correct error when Dog API returns status 500', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500
    } as unknown as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});