import React from "react";

type FeatureBoxProps = {
  heading: string;
  description: string;
};
const FeatureBox = React.memo(({ heading, description }: FeatureBoxProps) => {
  return (
    <div
      className="w-[192px] h-[192px] md:w-[225px] md:h-[225px] 
                 bg-[url('/assets/features-box.svg')] bg-no-repeat bg-cover
                 flex flex-col items-center justify-start gap-2 xs:gap-4
                 text-center p-2 rounded-2xl cursor-pointer
                 transition-all duration-300 ease-in-out 
                 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:brightness-110"
    >
      <div className="text-white text-[25px] xs:text-2xl font-bold drop-shadow-md">
        {heading}
      </div>
      <div className="text-white text-[10px] xs:text-[15px] drop-shadow-sm">
        {description}
      </div>
    </div>
  );
});
FeatureBox.displayName = "FeatureBox";

const features: FeatureBoxProps[] = [
  { heading: "Instant Grading & Feedback", description: "Students get immediate scores & correct answers right after they finish each quiz." },
  { heading: "Question Bank Library", description: "Teachers build, organize & reuse question sets by topic and difficulty." },
  { heading: "Quiz Randomization", description: "Shuffle questions & options so every student sees a slightly different version." },
  { heading: "Detailed Analytics Dashboard", description: "Track class & individual performance, spot weak topics and measure growth over time." },
  { heading: "Timed & Scheduled Assessments", description: "Time limits to enforce test windows." },
  { heading: "Multi-Device Access", description: "Full support for phones, tablets, laptops — take or assign quizzes anytime, anywhere." },
];


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-black">
      {/* Hero Section */}
      <div
        className="bg-[url('/assets/background.svg')] bg-repeat bg-contain 
                   flex flex-col justify-center items-center"
      >
        <div className="xs:w-[75%] w-[95%] flex flex-col items-center justify-center gap-10 h-[calc(100vh-100px)] xs:h-screen">
          <div className="text-6xl xs:text-7xl font-extrabold text-amber-500 dark:text-yellow-500 text-center text-shadow-yellow-400 text-shadow-lg">
            The <br /> Unlock Knowledge. Boost Confidence.
          </div>
          <div className="text-black dark:text-white text-center text-2xl xs:text-3xl">
            Practice makes perfect. Our MCQ system lets students sharpen skills, track progress, and reach potential. Teachers get tools that make assessment meaningful.
          </div>
        </div>
        <div className="min-h-[200vh] w-[95%] xs:w-[75%] flex flex-col justify-center items-center space-y-5 rounded-4xl text-black dark:text-white">
          <img
            alt="Features Picture 2"
            src="/featuresPics/featuresPic2.jpg"
            className="w-full h-auto object-cover rounded-xl"
          />
          <img
            alt="Features Picture 1"
            src="/featuresPics/featuresPic1.jpg"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

      </div>

      {/* Features Section */}
      <div className="w-full h-full">
        <div className="bg-yellow-600 w-full h-40 flex justify-center items-center text-center text-5xl xs:text-7xl font-extrabold text-white">
          What we offer?
        </div>
        <div className="flex justify-center items-center w-full h-full bg-[url('/assets/background.svg')] bg-repeat bg-contain">
          <div className="lg:px-40 flex flex-wrap items-center justify-center gap-8 my-8">
            {features.map((feature, index) => (
              <FeatureBox key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
