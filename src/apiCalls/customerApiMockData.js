export const customerList = [
  {
    firstName: 'Jan',
    lastName: 'Kowalski',
    phoneNo: '424144112',
    password: '$2a$08$DKimIcXDyv7k3JmyLSbi4.zZSiXzceCU1YyeeTCQhD4v/brjCEQN2'
  },
  {
    firstName: 'Adam',
    lastName: 'Nowak',
    phoneNo: '312311551',
    password: '$2a$08$DKimIcXDyv7k3JmyLSbi4.zZSiXzceCU1YyeeTCQhD4v/brjCEQN2'
  },
  {
    firstName: 'Marek',
    lastName: 'Szewczyk',
    phoneNo: '736731311',
    password: '$2a$08$DKimIcXDyv7k3JmyLSbi4.zZSiXzceCU1YyeeTCQhD4v/brjCEQN2'
  }
];
export const customerDetailsList = [
  {
    _id: 1,
    firstName: 'Jan',
    lastName: 'Kowalski',
    phoneNo: '424144112',
    password: '$2a$08$DKimIcXDyv7k3JmyLSbi4.zZSiXzceCU1YyeeTCQhD4v/brjCEQN2',
    rentals: [
      {
        _id: 1,
        customerId: 1,
        equipmentId: 1,
        startDate: '2022-09-03T00:00:00.000Z',
        endDate: '2022-09-06T00:00:00.000Z',
        equipment: {
          _id: 1,
          type: 'łyżwy',
          size: '39.0',
          purpose: 'hokejowe'
        }
      }
    ]
  },
  {
    _id: 2,
    firstName: 'Adam',
    lastName: 'Nowak',
    phoneNo: '312311551',
    password: '$2a$08$DKimIcXDyv7k3JmyLSbi4.zZSiXzceCU1YyeeTCQhD4v/brjCEQN2',
    rentals: [
      {
        _id: 2,
        customerId: 2,
        equipmentId: 2,
        startDate: '2022-10-14T00:00:00.000Z',
        endDate: '2022-10-14T00:00:00.000Z',
        equipment: {
          _id: 2,
          type: 'rolki',
          size: '42.5',
          purpose: 'figurowe'
        }
      }
    ]
  },
  {
    _id: 3,
    firstName: 'Marek',
    lastName: 'Szewczyk',
    phoneNo: '736731311',
    password: '$2a$08$DKimIcXDyv7k3JmyLSbi4.zZSiXzceCU1YyeeTCQhD4v/brjCEQN2',
    rentals: [
      {
        _id: 3,
        customerId: 3,
        equipmentId: 1,
        startDate: '2022-11-19T00:00:00.000Z',
        endDate: null,
        equipment: {
          _id: 1,
          type: 'łyżwy',
          size: '39.0',
          purpose: 'hokejowe'
        }
      }
    ]
  }
];
