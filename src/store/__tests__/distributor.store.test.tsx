import '@testing-library/jest-dom';

import { mockIntermediation } from 'src/utils/mocks';

import { useDistributorStore } from '../appointments.store';

describe('useDistributorStore', () => {
  const mockDistributor = [
    {
      id: '1',
      document: '12345678901',
      corporateName: 'ACME Inc.',
      localizaCode: '123456',
      createdAt: '2021-10-01T10:00:00.000Z',
      modifiedAt: '2021-10-05T15:30:00.000Z',
      type: 'Distributor',
      user: 'John Doe',
      address: {
        street: '123 Main St',
        number: '1',
        neighborhood: 'Downtown',
        city: 'Anytown',
        uf: 'ST',
        zipCode: '12345-678',
        complement: 'Suite 100',
      },
      phones: ['(123) 456-7890'],
      emails: ['john.doe@example.com'],
    },
  ];
  it('should set the linkPDF object with non-empty string values', () => {
    useDistributorStore.getState().setDistributorsList(mockDistributor);

    expect(useDistributorStore.getState().distributorsList).toEqual(
      mockDistributor
    );
  });
  test('setIntermediationsList updates intermediationsList', () => {
    const items = [mockIntermediation];

    useDistributorStore.getState().setIntermediationsList(items);

    expect(useDistributorStore.getState().intermediationsList).toEqual(items);
  });
});
