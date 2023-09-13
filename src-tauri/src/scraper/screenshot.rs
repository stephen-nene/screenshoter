#[tauri::command]
pub fn capture_screenshot(link: &str) -> Result<(String, String), String> {
    let browser = match headless_chrome::Browser::default() {
        Ok(browser) => browser,
        Err(err) => return Err(format!("Failed to create browser: {:?}", err)),
    };

    let tab = match browser.new_tab() {
        Ok(tab) => tab,
        Err(err) => return Err(format!("Failed to create new tab: {:?}", err)),
    };

    if let Err(err) = tab.navigate_to(link) {
        return Err(format!("Failed to navigate to {}: {:?}", link, err));
    }
        // Wait for the page navigation to complete
        tab.wait_until_navigated().unwrap();
    // Define a CSS selector for the element you want to wait for
    // let element_selector = ".prebet-match__teams__home"; // Change this selector to match your specific element

    // // Wait for the element to appear with a timeout
    // tab.wait_for_element(element_selector).unwrap();

    let screenshot_data = tab
        .capture_screenshot(headless_chrome::protocol::cdp::Page::CaptureScreenshotFormatOption::Png, None, None, true)
        .unwrap();

    // Define the full path to save the image
    let image_path = format!("../src/assets/images/screenshot.png");

    // Create the new directory if it doesn't exist
    std::fs::create_dir_all(&"../src/assets/images").unwrap();

    // Write the screenshot data to the output file in the new directory
    std::fs::write(&image_path, &screenshot_data).unwrap();
    
    let message = format!("Captured a screenshot of {}", link);

    Ok((message, image_path))
}
