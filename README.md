# Stripe Card Update

## ## This project is to update card information on Stripe (delete the current card & save a new one). The following steps are needed for this to work:

1) Clone this repo.

2) Go to Stripe's website, log in, and enable Test Mode (there should be a 'View Test Data' on bottom of the page).

3) While on Stripe's website, create a test customer with an arbitrary email and random card information (the actual card number must be '4242424242424242').

4) Also, while on Stripe's website, take note of your Private and Public API Keys.

5) Go to the cloned folder, click the 'GCF File' folder, copy the entire contents of the index.js file and of the package.json file.

6) Go to Google Cloud Functions' website, create a new function, paste the index.js file's content into the Cloud Function, paste the package.json file's content into the package.json tab, and underneath where it says "Functions to execute", replace helloWorld with updateCard. Take note of your Google Cloud Function URL.

7) Go back to the cloned folder, delete the GCF File folder, and navigate to public->js->main.js. Replace line 2's pk_test_.. with your Public API Key, and line 82's YOUR_GCF_URL with the URL of your Google Cloud Function.

8) Go to Google Firebase's website, and deploy the cloned folder following the documents in https://firebase.google.com/docs/hosting/deploying (The deployment process is done on the terminal/command line). Take note of the Firebase URL.

9) Go back to the Google Cloud Function's website, edit your function, replace line 12's YOUR_HOSTED_URL with your Firebase URL, line 21's sk_test_.. with your Private API Key, and save.

10) When testing the form on your Firebase website, make sure the email being input matches the test customer's email. Also, the card number must be 4242424242424242.


Last thoughts:

-Because you're on Test Mode on the Stripe website, the Stripe API Keys are test versions. To enable Live mode, simply disable Test Mode, take note of your real API Keys, and replace the corresponding Keys in the Google Cloud Function and the cloned folder (must re-deploy the cloned folder).

-When replacing with URLs, it's imperative that the end of the URL does not contain '/', such as '.com/'. Please please please delete the '/'.

-The Google Cloud Function can be made to be accessible by any client, so long as you refer to Step 9 and change YOUR_HOSTED_URL to the client's URL. An example of this would be a localhost:8000 server, in which you'd replace YOUR_HOSTED_URL with http://localhost:8000 .