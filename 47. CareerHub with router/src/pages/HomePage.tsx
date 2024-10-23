import Hero from '../components/Hero/Hero';
import JobCategoryCard from '../components/JobCategory/JobCategoryCard';
import useFetchData from '../hooks/useFetchData';
import { IJobCategory } from '../types';

export default function HomePage() {
  const jobCategories = useFetchData<IJobCategory>('categories.json');

  return (
    <main>
      {/* Hero */}
      <div className="bg-[#F9F9FF]">
        <div className="px-4 mx-auto max-w-7xl">
          <Hero />
        </div>
      </div>

      {/* Job Category List */}
      <section className="py-32 font-light">
        <h3 className="text-center text-5xl leading-[60px] text-[#1A1919]">
          Job Category List
        </h3>
        <p className="text-center leading-6 text-[#757575] pt-4 pb-8">
          Explore thousands of job opportunities with all the information you
          need. Its your future
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {jobCategories.map((category) => (
            <JobCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
}
