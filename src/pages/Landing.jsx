import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initFlowbite } from 'flowbite';

export default function Instructions() {
  const navigate = useNavigate();
  
  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works-section");
    if (section) {
      const yOffset = -40; // adjust based on your header height
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <section class="bg-white w-full">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
              <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Uncover Your Instagram Unfollowers</h1>
              <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">You follow them. They don't follow back. Want to know who?</p>
              <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a
                  onClick={() => navigate('/upload')}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/85 focus:ring-4 focus:ring-blue-300 cursor-pointer"
                >
                  Discover Unfollowers
                  <svg
                    className="w-5 h-4.5 ms-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 328 328"
                    fill="currentColor"
                  >
                    <g>
                      <path d="M77.622,120.372c9.942,0,19.137-3.247,26.593-8.728c11.382,16.007,30.063,26.479,51.157,26.479 c21.093,0,39.774-10.472,51.157-26.479c7.456,5.481,16.651,8.728,26.593,8.728c24.813,0,45-20.187,45-44.999 c0-24.814-20.187-45.001-45-45.001c-9.943,0-19.138,3.248-26.594,8.729c-11.383-16.006-30.063-26.478-51.156-26.478 c-21.093,0-39.773,10.472-51.156,26.478c-7.456-5.481-16.651-8.729-26.594-8.729c-24.813,0-45,20.187-45,45.001 C32.622,100.186,52.809,120.372,77.622,120.372z M233.122,60.372c8.271,0,15,6.73,15,15.001c0,8.271-6.729,14.999-15,14.999 c-8.271,0-15-6.729-15-14.999C218.122,67.102,224.851,60.372,233.122,60.372z M155.372,42.623c18.059,0,32.75,14.691,32.75,32.75 s-14.691,32.75-32.75,32.75c-18.059,0-32.75-14.691-32.75-32.75S137.313,42.623,155.372,42.623z M77.622,60.372 c8.271,0,15,6.73,15,15.001c0,8.271-6.729,14.999-15,14.999s-15-6.729-15-14.999C62.622,67.102,69.351,60.372,77.622,60.372z"></path> <path id="XMLID_440_" d="M233.122,150.372c-19.643,0-38.329,7.388-52.584,20.532c-8.103-1.816-16.523-2.781-25.166-2.781 c-8.643,0-17.063,0.965-25.165,2.781c-14.255-13.144-32.942-20.532-52.585-20.532C34.821,150.372,0,185.194,0,227.995 c0,8.284,6.716,15,15,15h32.6c-4.669,12.5-7.228,26.019-7.228,40.127c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15 c0-14.108-2.559-27.627-7.229-40.127h32.602c8.284,0,15-6.716,15-15C310.745,185.194,275.923,150.372,233.122,150.372z M32.42,212.995c6.298-18.934,24.181-32.623,45.202-32.623c6.617,0,13.052,1.382,18.964,3.95 c-12.484,7.456-23.443,17.209-32.29,28.673H32.42z M71.697,268.122c7.106-39.739,41.923-69.999,83.675-69.999 c41.751,0,76.569,30.26,83.675,69.999H71.697z M246.449,212.995c-8.848-11.464-19.806-21.217-32.29-28.673 c5.912-2.567,12.347-3.95,18.964-3.95c21.021,0,38.905,13.689,45.203,32.623H246.449z"></path>
                    </g>
                  </svg>
                </a>

                  <a onClick={scrollToHowItWorks} class="py-3 px-5 sm:ms-4 text-sm cursor-pointer font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[var(--color-primary)] focus:z-10 focus:ring-4 focus:ring-gray-100">
                      How it works
                  </a>  
              </div>
          </div>
      </section>

      <section id="how-it-works-section" className="w-full bg-gray-50 rounded-2xl shadow-md py-12 px-8 md:px-16 lg:px-24">
        <h2 className="mb-8 text-2xl font-semibold text-center text-[var(--color-primary)]">
          How does Unfolo work?
        </h2>

        <ol className="list-decimal space-y-8 text-gray-800 leading-relaxed max-w-4xl mx-auto">
          
          <li>
            <strong className="text-lg">Request your Instagram data:</strong>
            <ol className="list-decimal pl-6 mt-4 space-y-3 text-base">
              <li>Open the Instagram app and go to your profile.</li>
              <li>Tap the menu (☰) in the top right.</li>
              <li>Go to <strong>Accounts Center</strong>.</li>
              <li>Select <strong>Your information and permissions</strong>.</li>
              <li>Select <strong>Download your information</strong>.</li>
              <li>Select <strong>Create export</strong>.</li>
              <li>Select <strong>Export to device</strong>.</li>
              <li>
                Set the following:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Customise information:</strong> All time</li>
                  <li><strong>Date range:</strong> All time</li>
                  <li><strong>Format:</strong> JSON</li>
                </ul>
                Then tap <strong>Start export</strong>.
              </li>
            </ol>
          </li>

          <li>
            <strong className="text-lg">Download your ZIP file:</strong>
            <ol className="list-decimal pl-6 mt-4 space-y-3 text-base">
              <li>Instagram will notify you once your file is ready (usually within 5-10 minutes).</li>
              <li>Follow the link from the notification/email or go 
                to the same section in the app and download the ZIP file by entering your Instagram password. 
              </li>
            </ol>
          </li>

          <li>
            <strong className="text-lg">Upload to Unfolo:</strong>
            <p className="mt-4 text-base">
              Once your ZIP file is downloaded, come back here and click the upload button. We'll process it and show you who doesn't follow you back — all privately, right on your device.
            </p>
          </li>

        </ol>
      </section>

      <section class="bg-white w-full flex flex-row gap-4 justify-center mx-auto flex-wrap py-15 px-6">
        <div class="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center flex flex-col items-center">
          <svg class="w-7 h-7 text-gray-500 mb-3" aria-hidden="true"   fill="currentColor" viewBox="0 0 23 23">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">100% Safe & Private</h5>
          </a>
          <p class="mb-3 font-normal text-gray-500">                  
            Your security is our priority. Unlike other apps, Unfolo never asks for your 
            Instagram password or access to your account. Everything runs locally on your 
            browser using the Instagram data you download yourself. That means no privacy 
            compromises, no account bans — just safe and secure analysis.
          </p>
        </div> 

        <div class="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center flex flex-col items-center">
          <svg class="w-7 h-7 text-gray-500 mb-3" aria-hidden="true" fill="currentColor" viewBox="0 0 22 22">
              <path d="M18,11.74a1,1,0,0,0-.52-.63L14.09,9.43,15,3.14a1,1,0,0,0-1.78-.75l-7,9a1,1,0,0,0-.18.87,1.05,1.05,0,0,0,.6.67l4.27,1.71L10,20.86a1,1,0,0,0,.63,1.07A.92.92,0,0,0,11,22a1,1,0,0,0,.83-.45l6-9A1,1,0,0,0,18,11.74Z"/>
          </svg>
          <a href="#">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">No Setup. Just Upload & Analyze</h5>
          </a>
          <p class="mb-3 font-normal text-gray-500">
            Using Unfolo is incredibly easy. Download your Instagram data ZIP from Meta, 
            upload it here, and instantly get your results. No signup, no installations, 
            no hidden fees. Whether you're a casual user or a content creator, Unfolo gives 
            you instant insights with zero hassle.
          </p>
        </div> 
        
        <div class="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center flex flex-col items-center">
          <svg class="w-7 h-7 text-gray-500 mb-3" aria-hidden="true" fill="currentColor" viewBox="0 -64 640 640">
            <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path>
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Real-Time Unfollower Tracking</h5>
          </a>
          <p class="mb-3 font-normal text-gray-500">
            Curious about who stopped following you? Unfolo helps you instantly identify users 
            who no longer follow you back. With our accurate analysis of your Instagram data, 
            you get a clear list of unfollowers — no second-guessing, no complicated tools. 
            Stay informed and in control of your following relationships.
          </p>
        </div>

      </section>

      <section className="bg-gray-50 w-full flex justify-center py-15 px-6">
        <div className="w-full max-w-6xl" id="accordion-collapse" data-accordion="collapse">
          
          <h2 id="accordion-collapse-heading-1">
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-gray-800 border border-b-0 border-gray-200 rounded-t-xl hover:bg-gray-100 gap-3 aria-expanded:text-[var(--color-primary)]" data-accordion-target="#accordion-collapse-body-1" aria-expanded="false" aria-controls="accordion-collapse-body-1">
              <span>How does this tool find who doesn't follow me back?</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
            <div className="p-5 border border-b-0 border-gray-200">
              <p className="mb-2 text-gray-600">
                We process your Instagram “Followers” and “Following” data from the ZIP file you download directly from Instagram.
                By comparing the two lists, we identify accounts you follow that aren't following you back.
              </p>
            </div>
          </div>

          <h2 id="accordion-collapse-heading-2">
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-gray-800 border border-b-0 border-gray-200 hover:bg-gray-100 gap-3 aria-expanded:text-[var(--color-primary)]" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
              <span>Is my Instagram password required?</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div className="p-5 border border-b-0 border-gray-200">
              <p className="text-gray-600">
                No. We never ask for your Instagram login or password. The tool only works with the JSON files inside the ZIP
                that Instagram sends you.
              </p>
            </div>
          </div>

          <h2 id="accordion-collapse-heading-3">
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-gray-800 border border-b-0 border-gray-200 hover:bg-gray-100 gap-3 aria-expanded:text-[var(--color-primary)]" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
              <span>Is my data stored anywhere?</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
            <div className="p-5 border border-b-0 border-gray-200">
              <p className="text-gray-600">
                No. All processing happens in your browser. Your Instagram data never leaves your device.
              </p>
            </div>
          </div>

          <h2 id="accordion-collapse-heading-4">
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-gray-800 border border-b-0 border-gray-200 hover:bg-gray-100 gap-3 aria-expanded:text-[var(--color-primary)]" data-accordion-target="#accordion-collapse-body-4" aria-expanded="false" aria-controls="accordion-collapse-body-4">
              <span>Why do I need to request my data from Instagram?</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-4" className="hidden" aria-labelledby="accordion-collapse-heading-4">
            <div className="p-5 border border-b-0 border-gray-200">
              <p className="text-gray-600">
                Instagram does not allow direct access to your follower data without logging in. Requesting your data ensures 
                we use accurate information straight from Instagram while keeping your account secure.
              </p>
            </div>
          </div>

          <h2 id="accordion-collapse-heading-5">
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-gray-800 border border-gray-200 hover:bg-gray-100 gap-3 aria-expanded:text-[var(--color-primary)]" data-accordion-target="#accordion-collapse-body-5" aria-expanded="false" aria-controls="accordion-collapse-body-5">
              <span>Can I see who unfollowed me in the past?</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-5" className="hidden" aria-labelledby="accordion-collapse-heading-5">
            <div className="p-5 border border-t-0 border-gray-200">
              <p className="text-gray-600">
                This tool works with the current snapshot of your followers/following from the ZIP file. 
                To track changes over time, you'd need to keep older ZIP files for comparison.
              </p>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
