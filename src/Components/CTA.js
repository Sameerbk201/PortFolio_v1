import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className='flex justify-between pt-4'>
      <p className='text-[#70d8bd]'>
        Need an enthusiastic Team Player  <br className='sm:block hidden' /> in Development Solutions
         {" "} {"--->"}
      </p>
      <Link to='/contact' className='text-white bg-gradient-to-r from-[#00c6ff] to-[#0072ff] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-3.5 text-center'>
        Contact
      </Link>
    </section>
  );
};

export default CTA;
