// import { HrNewcomersTable } from 'src/components/HrNewcomersTable/HrNewcomersTable.tsx';
// import { render, screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { mockResponse } from 'src/components/HrNewcomersTable/__tests__/mock.ts';
// import { BrowserRouter } from 'react-router-dom';
// import axios from 'axios';
//
// jest.mock('axios', () => {
//   return {
//     get: jest.fn(),
//   };
// });
// const mockedAxios = axios as jest.MockedFunction<typeof axios>;
//
// describe('Test HrNewcomers Table', () => {
//   global.ResizeObserver = jest.fn().mockImplementation(() => ({
//     observe: jest.fn(),
//     unobserve: jest.fn(),
//     disconnect: jest.fn(),
//   }));
//
//   afterEach(() => {
//     jest.resetAllMocks();
//   });
//
//   const user = userEvent.setup();
//
//   it('- correct number of pages', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <HrNewcomersTable />
//         </BrowserRouter>,
//       );
//     });
//
//     mockedAxios.mockResolvedValue({
//       data: mockResponse,
//       status: 200,
//       statusText: 'Ok',
//       headers: {},
//       config: {},
//     });
//
//     expect(
//       screen.getByRole('button', {
//         name: /First/i,
//       }),
//     ).toHaveClass('yc-button_disabled');
//
//     await user.click(screen.getByText('3'));
//     expect(screen.getAllByRole('button', { pressed: true })[0]).toHaveClass(
//       'yc-button_selected',
//     );
//     expect(
//       screen.getAllByRole('button', { pressed: true })[0].textContent,
//     ).toBe('3');
//   });
//
//   it('- search functionality', async () => {
//     await act(async () => {
//       render(
//         <BrowserRouter>
//           <HrNewcomersTable />
//         </BrowserRouter>,
//       );
//     });
//
//     mockedAxios.mockResolvedValue({
//       data: mockResponse,
//       status: 200,
//       statusText: 'Ok',
//       headers: {},
//       config: {},
//     });
//
//     await user.click(screen.getByText('1'));
//     await user.click(await screen.findByPlaceholderText('Search ...'));
//     await user.paste('es');
//     await user.click(screen.getByText('2'));
//
//     expect(
//       screen.getAllByRole('button', { pressed: true })[0].textContent,
//     ).toBe('2');
//     expect(
//       screen.getByRole('button', {
//         name: /Next/i,
//       }),
//     ).toHaveClass('yc-button_disabled');
//   });
// });
