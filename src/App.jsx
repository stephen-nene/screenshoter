import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "antd";

function App() {
  const [scrapeMSG, setscrapeMSG] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("https://placehold.co/600x400.png");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
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

  async function greet() {
    if (linkChecker(name, setError)) {
      // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
      setGreetMsg(await invoke("greet", { name }));
    }
  }

  // const scraped = async () => {
  //   setLoading(true);
  //   console.log("Loading set to true"); // Add this log statement
  //   try {
  //     message.success("here");
  //     if (linkChecker(link, setError)) {
  //       const [scrapeMessage, imagePath] = await invoke("capture_screenshot", { link });
  //       setImage(imagePath); // Set the image path in your state
  //       message.success({ content: "Scrapped " + link, duration: 2 }); // Display a success message
  //     }
  //   } catch (e) {
  //     console.log('Error: ', e);
  //     message.error({ content: 'An error occurred at the server', duration: 3 }); // Display an error message
  //   } finally {
  //     setLoading(false);
  //     console.log("Loading set to false"); // Add this log statement
  //   }
  // };

  const scrape = async () => {
    setLoading(true);
    console.log("Loading set to true"); // Add this log statement
    try {
      message.success("here");

    } catch (e) {
      console.log('Error: ', e);
      message.error({ content: 'An error occurred at the server', duration: 3 }); // Display an error message
    } finally {
      setLoading(false);
      console.log("Loading set to false"); // Add this log statement
    }
  };






  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Steves-bet bot!</h1>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
        className="flex mt-3 items-center space-x-2"
      >
        <input
          id="greet-input"
          className={`${
            error ? "border-red " : "border-gray-300"
          } border p-2 rounded-lg`}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Welcome
        </button>
      </form> */}

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
      <p className="mt-4">{greetMsg}</p>
      <p className="mt-4">{scrapeMSG}</p>

      <img className="my-4" src={image} alt="" />
    </div>
  );
}

export default App;
