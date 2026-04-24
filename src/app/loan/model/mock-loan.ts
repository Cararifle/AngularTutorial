import { Loan } from './loan';

export const LOAN_DATA: Loan[] = [
  {
    id: 1,
    game: {
      id: 1,
      title: 'Juego 1',
      age: 10,
      category: { id: 1, name: 'Categoría 1' },
      author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' },
    },
    client: { id: 1, name: 'Cliente 1' },
    loanDate: new Date('2023-01-01'),
    returnDate: new Date('2023-01-15'),
  },
  {
    id: 2,
    game: {
      id: 2,
      title: 'Juego 2',
      age: 12,
      category: { id: 2, name: 'Categoría 2' },
      author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' },
    },
    client: { id: 2, name: 'Cliente 2' },
    loanDate: new Date('2023-02-01'),
    returnDate: new Date('2023-02-10'),
  },
  {
    id: 3,
    game: {
      id: 3,
      title: 'Juego 3',
      age: 8,
      category: { id: 1, name: 'Categoría 1' },
      author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' },
    },
    client: { id: 3, name: 'Cliente 3' },
    loanDate: new Date('2023-03-01'),
    returnDate: new Date('2023-03-20'),
  },
];
