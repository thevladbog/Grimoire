import { Routes, Route } from 'react-router-dom';

import {
  CheckIn,
  Equipment,
  Home,
  HrNewcomers,
  Labels,
  SdNewcomers,
} from './pages';
import { Wrapper } from 'src/components/Wrapper.tsx';

import {
  CheckInPageConfig,
  EquipmentPageConfig,
  HrNewcomersPageConfig,
  LabelsPageConfig,
  MainPageConfig,
  SdNewcomersPageConfig,
} from 'src/configs/pages.config.ts';
import './App.scss';
import ErrorPage from 'src/pages/ErrorPage.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Wrapper />}>
          <Route path={MainPageConfig.link} element={<Home />} />
          <Route path={SdNewcomersPageConfig.link} element={<SdNewcomers />} />
          <Route path={EquipmentPageConfig.link} element={<Equipment />} />
          <Route path={LabelsPageConfig.link} element={<Labels />} />
          <Route path={CheckInPageConfig.link} element={<CheckIn />} />
          <Route path={HrNewcomersPageConfig.link} element={<HrNewcomers />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
