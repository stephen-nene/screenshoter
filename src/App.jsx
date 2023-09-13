import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "antd";

function App() {
  const [scrapeMSG, setscrapeMSG] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("https://placehold.co/600x400.png");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  function linkChecker(link, setError) {
    if (!link) {
      setError("Link cannot be empty");
      return false; // Return false to indicate an error
    } else {
      setError(""); // Clear any previous errors
      return true; // Return true to indicate success
    }
  }





  const scrape = async () => {
    if (linkChecker(link, setError)) {
      setLoading(true);
      try {
        // const loadingMessage = message.loading({ content: 'Scraping site...', duration: 0 });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay of 1 second
        const [scrapeMessage, imagePath] = await invoke("capture_screenshot", { link });

        setImage(imagePath); // Set the image path in your state

        message.success({ content: "Scrapped " + link, duration: 2 });

        // loadingMessage(); // Close the loading message
        setLoading(false);

        console.log('Loading finished'); // Log loading finish
      } catch (e) {
        setLoading(false); 
        console.log('Error: ', e);
        message.error(e)
        // message.error({ content: 'An error occurred at the server', duration: 3 }); // Display an error message
      }
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Steves-bet bot!</h1>


      <form
        onSubmit={(e) => {
          e.preventDefault();
          scrape();
        }}
        className="flex items-center mt-4 space-x-2"
      >
        <input
          id="link-input"
          className={` ${error ? "border-red " : "border-gray-300"
            } border  p-2 rounded-lg`}
          onChange={(e) => setLink(e.currentTarget.value)}
          placeholder="Enter a link..."
        />
        {!loading ? (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Scrape
          </button>
        ) : (
          <p className="text-blue-500">Loading ...</p>
        )}

      </form>



      {error && <p className="text-red mt-2">{error}</p>}
      <p className="mt-4">{scrapeMSG}</p>

      <img className="my-4" src={image} alt="" />
    </div>
  );
}

export default App;
