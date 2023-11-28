import { Routes, Route } from 'react-router-dom'

import { AsideHeaderShowcase } from './components/MainLayout/MainLayout'
import {
  CheckIn,
  Equipment,
  Home,
  HrNewcomers,
  Labels,
  SdNewcomers,
} from './pages'

import {
  CheckInPageConfig,
  EquipmentPageConfig,
  HrNewcomersPageConfig,
  LabelsPageConfig,
  MainPageConfig,
  SdNewcomersPageConfig,
} from 'src/configs/pages.config.ts'
import './App.scss'

function App() {
  return (
    <>
      <AsideHeaderShowcase />
      <Routes>
        <Route path={MainPageConfig.link} element={<Home />} />
        <Route path={SdNewcomersPageConfig.link} element={<SdNewcomers />} />
        <Route path={EquipmentPageConfig.link} element={<Equipment />} />
        <Route path={LabelsPageConfig.link} element={<Labels />} />
        <Route path={CheckInPageConfig.link} element={<CheckIn />} />
        <Route path={HrNewcomersPageConfig.link} element={<HrNewcomers />} />
      </Routes>
    </>
  )
}

export default App
