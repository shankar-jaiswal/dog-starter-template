import { describe, it, expect, vi, afterEach } from 'vitest';
import type { Request, Response } from 'express';
import * as dogService from '../services/dogService';
import { getDogImage } from '../controllers/dogController';

describe('dogController - getDogImage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return success true and mocked service JSON', async () => {
    const mockedServiceResult = {
      imageUrl: 'https://mocked-dog-image.jpg',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockedServiceResult);

    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceResult
    });
  });
});