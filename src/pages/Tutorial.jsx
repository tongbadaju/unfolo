import React from 'react';

const Tutorial = () => {
  return (
    <div className="w-full bg-gray-50 rounded-2xl shadow-md py-12 px-8 md:px-16 lg:px-24">
      <h2 className="mb-8 text-2xl font-semibold text-center text-[var(--color-primary)]">
        Step-by-step Tutorial
      </h2>

      <ul className="space-y-12 text-gray-800 leading-relaxed max-w-4xl mx-auto">
        {/* Step 1 */}
        <li>
          <p className="text-lg font-semibold text-[var(--color-primary)]">Step 1: Open the Instagram app</p>
          <p className="mt-4 text-base">
            Go to your profile and tap the menu (☰) in the top right corner.
          </p>
          <img
            src="tutorial/step1.png"
            alt="Open Instagram profile"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 2 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 2: Go to Accounts Center</strong>
          <img
            src="tutorial/step2.png"
            alt="Go to Account Center"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 3 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 3: Select "Your information and permissions"</strong>
          <img
            src="tutorial/step3.png"
            alt="Your information and permissions"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 4 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 4: Choose "Export your information"</strong>
          <img
            src="tutorial/step4.png"
            alt="Export your information"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 5 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 5: Tap "Create export"</strong>
          <img
            src="tutorial/step5.png"
            alt="Create export"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 6 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 6: Choose "Export to device"</strong>
          <img
            src="tutorial/step6.png"
            alt="Export to device"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 7 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 7: Set your export preferences</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-base">
            <li><strong>Customise information:</strong> Connections → Followers and Following</li>
            <li><strong>Date range:</strong> All time </li>
            <li><strong>Format:</strong> JSON</li>
          </ul>
          <p className="mt-2 text-base">Then tap <strong>Start export</strong>.</p>
          <img
            src="tutorial/step7.png"
            alt="Export preferences"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 8 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 8: Wait for Instagram to prepare your file</strong>
          <p className="mt-4 text-base">
            You'll receive a notification once it's ready (usually within 5-10 minutes).  
            Follow the link from the notification/email or return to the same place to download the ZIP file after entering your password.
          </p>
          <img
            src="tutorial/step8.png"
            alt="Download notification"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 9 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 9: Upload your ZIP file to Unfolo</strong>
          <p className="mt-4 text-base">
            Once downloaded, come back to Unfolo and click the upload button.  
            We'll process it and show you who doesn't follow you back — all privately, right on your device.
          </p>
          <img
            src="tutorial/step9.png"
            alt="Upload ZIP file to Unfolo"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>

        {/* Step 10 */}
        <li>
          <strong className="text-lg font-semibold text-[var(--color-primary)]">Step 10: View your results</strong>
          <p className="mt-4 text-base">
            The results will appear instantly on your device — nothing is stored on our servers.
          </p>
          <img
            src="tutorial/step10.png"
            alt="View results"
            className="mt-3 max-w-2xs rounded-lg shadow-lg"
          />
        </li>
      </ul>
    </div>
  );
};

export default Tutorial;
