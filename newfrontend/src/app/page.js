'use client'
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/Header';
import clinicAnimation from '../../public/Clinic.json';
import doctorAnimation from '../../public/doctor.json';
import Lottie from "lottie-react";

// Import necessary Tremor components if needed

const LandingPage = () => {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite</title>
      </Head>
      {/* <Navbar /> */}
      <Header />
      {/* Clinic Name and Image Section */}
      <div className="prof">
      <section className=" container mx-auto p-5">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 pt-[200px] px-10" >
            <h1 className='text-5xl text-blue-500'           
            style={{
              fontSize: "4rem",
              marginBottom: "16px",
              fontWeight: "650",}} >Vite Clinics</h1>
            <h2 className='text-2xl font-light'
              style={{
                fontSize: "2rem",
                fontWeight: "300",}} >Convenient healthcare at your fingertips.
            </h2>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <Lottie animationData={clinicAnimation} className='w-[550px] h-[550px]' loop={true} />
          </div>
        </div>
      </section>
      </div>


      {/* Our Services Section */}
      <section className="p-5 py-10">
        <h2 className='text-blue-500 pt-5 pb-1 text-center'               
          style={{
            fontSize: "2.5rem",
            fontWeight: "600",}}>
            Our Services
        </h2>
        <p class="mb-4 px-[300px] pb-10 mx-auto font-medium text-center">
          We are always striving to give our patients the best possible healthcare from the comfort of their homes with our convenient health packages and management system!
        </p>
        <div className='container mx-auto'>
          <div className="flex flex-wrap -mx-4">
            {/* Service Card 1 */}
            <div className="w-full md:w-1/4 p-4 pb-5">
              <div className="prof rounded-lg shadow-md hover:shadow-lg hover:bg-[#1e2638] transform hover:scale-105 transition duration-300 ease-in-out p-5">
                <a href="/services">
                <Image src='/onlineDoctor.svg' height={100} width={100} className='mx-auto my-5'/>
                <h5 className="text-blue-500 text-lg font-semibold">Online Appointments</h5>
                <h6 className="mb-2 text-gray-400 font-medium">Hate the clinic commute?</h6>
                <p className="text-gray-600 font-medium h-36">Say goodbye to unnecessary trips to clinics, with Vite you can now have video-calls with your doctors for your checkups!</p>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/4 p-4">
            <div className="prof rounded-lg shadow-md hover:shadow-lg hover:bg-[#1e2638] transform hover:scale-105 transition duration-300 ease-in-out p-5">
            <a href="/services">
              <Image src='/emergency.svg' height={100} width={100} className='mx-auto my-5'/>
              <h5 className="text-blue-500 text-lg font-semibold">Medical Emergencies</h5>
              <h6 className="mb-2 text-gray-400 font-medium">Got a time-sensitive medical emmergency?</h6>
              <p className="text-gray-600 font-medium h-32">Our specialized doctors are available 24/7 to accomodate for any emergencies and walk you through handling them.</p>
            </a>  
            </div>
            </div>
            <div className="w-full md:w-1/4 p-4">
            <div className="prof rounded-lg shadow-md hover:shadow-lg hover:bg-[#1e2638] transform hover:scale-105 transition duration-300 ease-in-out p-5">
              <a href="/services">
              <Image src='/prescription.svg' height={100} width={100} className='mx-auto my-5'/>
              <h5 className="text-blue-500 text-lg font-semibold">Virtual Diagnosis</h5>
              <h6 className="mb-2 text-gray-400 font-medium">Feeling unwell and need a quick diagnosis? </h6>
              <p className="text-gray-600 font-medium h-32">No more guessing! Get a full diagnosis and prescription for your symptoms from proffesionals, at the click of a button!</p>
              </a>
              </div>
            </div>
            <div className="w-full md:w-1/4 p-4">
            <div className="prof rounded-lg shadow-md hover:shadow-lg hover:bg-[#1e2638] transform hover:scale-105 transition duration-300 ease-in-out p-5">
            <a href="/services">
              <Image src='/heartbeat.svg' height={100} width={100} className='mx-auto my-5'/>
              <h5 className="text-blue-500 text-lg font-semibold">Chronic Disease Management</h5>
              <h6 className="mb-2 text-gray-400 font-medium">Need frequent checkups? Your health is our top priority!</h6>
              <p className="text-gray-600 font-medium h-24">Chronical illnesses made a easier with our frequent and prioritized management services.</p>
            </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-1/4 px-4 py-3 my-10 text-lg rounded font-bold text-white border-2 transform hover:scale-105 border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent text-[#007bff]">
            <a href="/services" class="flex items-center justify-center">
              Explore Health Packages
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id='about' className="prof py-5">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-center">
          <div class="w-full lg:w-1/2 p-4">
          <Lottie animationData={doctorAnimation} loop={true} className='w-[550px] h-[550px]'/>          
          </div>

          <div class="w-full lg:w-1/2 p-5 py-10">
            <h1 class="text-md font-semibold mb-4">About Us</h1>
            <h2 class="text-2xl font-semibold mb-4 text-blue-500">Egypt's Pinoeering Virtual Clinic</h2>
            <p class="mb-5">
            We proudly introduce Egypt's pioneering virtual clinic, providing convenient online doctor consultations. 
            Farewell to lengthy commutes to the clinics, and say hello to immediate healthcare access at the touch of a button.
            We stand ready to address all your medical requirements, particularly during urgent situations.
            </p>
            <ul class="list-disc pl-5 mb-4">
              <li className='py-1'>Video Chat with field-professionals</li>
              <li className='py-1'>Choose from our long list of trusted doctors</li>
              <li className='py-1'>Manage healthcare for you and your family members</li>
              <li className='py-1'>Subscribe to our health packages and get exclusive offers</li>
            </ul>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-105 border-2 border-[#007bff] hover:bg-transparent">
              <a href="/#testimonials"> Learn More </a>
            </button>
          </div>
        </div>
      </div>
      </section>


      {/* Testimonial Section */}
      {/* Use Tremor Carousel or equivalent component */}
      {/* ... */}
      <section className=" container mx-auto p-5" id='about'>
        <h5 className="text-center pt-10 pb-2 text-blue-500 font-semibold">A GOOD WORD MEANS A LOT</h5>
        <h1 className="text-center text-gray-100 font-bold"             
        style={{
          fontSize: "3rem",
          fontWeight: "650",}}>Patient Testimonials</h1>
        <h5 className="text-center pb-2 pb-2 text-blue-200 font-medium">Find out what our loyal patients have to say about Vite Clinics...</h5>
        <div className="flex flex-wrap pb-3 my-5">
        <div class="container mx-auto px-6 py-10">
        <div class="flex flex-wrap justify-center">

        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center rounded-lg hover:scale-105 border border-blue-500 shadow-md hover:bg-[#1e2638]">
            <Image src='/person1.png' height={200} width={200} className='mx-auto my-5'/>
            <div className="p-4">
              <h5 className="text-2xl font-bold text-blue-500 mb-2">Testimonial Title 1</h5>
              <p className="text-gray-100 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center rounded-lg hover:scale-105 border border-blue-500 shadow-md hover:bg-[#1e2638]">
            <Image src='/person2.png' height={200} width={200} className='mx-auto my-5'/>
            <div className="p-4">
              <h5 className="text-2xl font-bold text-blue-500 mb-2">Testimonial Title 2</h5>
              <p className="text-gray-100 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center rounded-lg hover:scale-105 border border-blue-500 shadow-md hover:bg-[#1e2638]">
            <Image src='/person4.png' height={200} width={200} className='mx-auto my-5'/>
            <div className="p-4">
              <h5 className="text-2xl font-bold text-blue-500 mb-2">Testimonial Title 3</h5>
              <p className="text-gray-100 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        </div>
</div>

        </div>
      </section>


      {/* Statistics Section */}
      <section className="container mx-auto p-5">
        <h2 className="text-center py-3 text-blue-500"><strong>Get to know our success, but in numbers..</strong></h2>
        <hr className='w-75 mx-auto'/>
        <div className="flex flex-wrap pb-3 my-5">
          {/* Statistic Item 1 */}
          <div className="w-full md:w-1/4 p-4">
            <div className="text-center">
              <h2 className="text-blue-500">5000+</h2>
              <p>Happy Patients</p>
            </div>
          </div>
          {/* ... similar structure for other statistics ... */}
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="prof py-5">
        <div className="container text-center">
          <h2 className='py-3 text-blue-500'>
            <strong>
              Sign up and never worry about your healthcare again!
            </strong>
          </h2>
          <div className="">
            <a href="/guest/Register" className="bg-blue-500 text-white mt-3 p-3 px-4 rounded">
              <strong>Sign Up Now</strong>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
