import streamlit as st
import subprocess

st.set_page_config(page_title="Instagram Scraper Demo", layout="centered")
st.title(" Instagram Scraper Demo")

st.markdown("This tool scrapes Instagram posts, tracks engagement, and lets you manually tag video types.")

#  Inputs
profile = st.text_input("Enter Instagram username")
max_posts = st.slider("Max posts to scrape", 10, 100, 50)
run_button = st.button("Run Scraper")

#  Trigger scraper
if run_button and profile:
    st.info(f"Scraping {max_posts} posts from @{profile}...")
    result = subprocess.run(["python", "scraper.py", profile, str(max_posts)], capture_output=True, text=True)
    st.text(result.stdout)
    st.success("✅ Scrape complete. CSV saved.")
