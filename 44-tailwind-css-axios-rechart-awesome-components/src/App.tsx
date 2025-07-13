import AreaChartFillByValue from './components/Charts/AreaChartFillByValue';
import LineChart from './components/Charts/LineChart';
import PieChartWithNeedle from './components/Charts/PieChartWithNeedle';
import SameDataComposedChart from './components/Charts/SameDataComposedChart';
import SimpleAreaChart from './components/Charts/SimpleAreaChart';
import SimpleBarChart from './components/Charts/SimpleBarChart';
import SimpleLineChart from './components/Charts/SimpleLineChart';
import StackedAreaChart from './components/Charts/StackedAreaChart';
import StackedBarChart from './components/Charts/StackedBarChart';
import SynchronizedLineChart from './components/Charts/SynchronizedLineChart';
import ThreeDimScatterChart from './components/Charts/ThreeDimScatterChart';
import TwoLevelPieChart from './components/Charts/TwoLevelPieChart';
import Navbar from './components/Navbar/Navbar';
import PriceOptionList from './components/PriceOption/PriceOptionList';
import ProductList from './components/Product/ProductList';

export default function App() {
  return (
    <div className="p-4 mx-auto max-w-7xl">
      <Navbar />
      <PriceOptionList />

      <div className="pt-20">
        <LineChart />
        <SimpleLineChart />
        <SynchronizedLineChart />
        <SimpleAreaChart />
        <StackedAreaChart />
        <AreaChartFillByValue />
        <SimpleBarChart />
        <StackedBarChart />
        <SameDataComposedChart />
        <ThreeDimScatterChart />
        <TwoLevelPieChart />
        <PieChartWithNeedle />
      </div>

      <ProductList />
    </div>
  );
}
