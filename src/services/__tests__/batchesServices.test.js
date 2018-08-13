
import fetchMock from 'fetch-mock';
import localStorage from 'mock-local-storage';

import { batchService } from '../batches.services';

describe('Test for Batch Services', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  test('getbatch', async () => {
    console.log(localStorage);
    const mockData = {
      Batches: [{
        studentCount: 2, _id: '5b5da4218e789a0ace719ebc', instructorId: { _id: '5b5d7e9bc2413d3a63c867e5', name: 'monis' }, batchId: 'M-01', from: '2018-07-29T00:00:00.000Z', to: '2018-08-05T00:00:00.000Z', status: true, __v: 0,
      }],
    };

    const expected = [{
      batchID: 'M-01',
      status: 1,
      students: 2,
      startDate: '2018-07-29',
      endDate: '2018-08-05',
      details: '/batchdetails?batchId=5b5da4218e789a0ace719ebc&batchName=M-01',
    }];
    fetchMock.getOnce('*', mockData);
    const response = await batchService.getBatches();
    expect(response).toEqual(expected);
  });
});
