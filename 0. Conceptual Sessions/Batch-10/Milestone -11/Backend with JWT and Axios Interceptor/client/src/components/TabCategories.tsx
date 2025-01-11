import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useGetJobsQuery } from '../api/job/job.hooks';
import { IJob } from '../types/job';
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';

const TabCategories = () => {
  const [category, setCategory] = useState('Web Development');
  const getJobsQuery = useGetJobsQuery({ category });
  const { isPending, data } = getJobsQuery;

  if (isPending) return <LoadingSpinner />;

  return (
    <Tabs>
      <div className=" container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 ">
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
        <div className="flex items-center justify-center">
          <TabList>
            <Tab onClick={() => setCategory('Web Development')}>
              Web Development
            </Tab>
            <Tab onClick={() => setCategory('Graphics Design')}>
              Graphics Design
            </Tab>
            <Tab onClick={() => setCategory('Digital Marketing')}>
              Digital Marketing
            </Tab>
          </TabList>
        </div>

        {/* Tab 1 Content */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.data?.slice(0, 8)?.map((job: IJob) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </TabPanel>

        {/* Tab 2 Content */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.data?.slice(0, 8)?.map((job: IJob) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </TabPanel>

        {/* Tab 3 Content */}
        <TabPanel>
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.data?.slice(0, 8)?.map((job: IJob) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
