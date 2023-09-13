// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod scraper {
    pub mod screenshot;
}

// Import the capture_screenshot function
use scraper::screenshot::capture_screenshot;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You will be scrapped from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, capture_screenshot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
