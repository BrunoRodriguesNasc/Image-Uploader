import Box from "./Box";

const Section = () => (
    <div className="flex justify-center items-center h-screen flex-col">
      <Box/>
      <footer className="absolute bottom-0 text-[#A9A9A9] text-sm font-Montserrat">created by <strong className="underline">Bruno Rodrigues</strong> - devChallenges.io</footer>
    </div>
);

export default Section;