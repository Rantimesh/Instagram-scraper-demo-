import streamlit as st
import subprocess

st.title("Instagram Scraper Demo")

profile = st.text_input("Target Profile to Scrape")
max_posts = st.slider("Max posts to scrape", min_value=1, max_value=100, value=10)

if st.button("Run Scraper"):
    if not profile:
        st.error("Please enter a profile name.")
    else:
        st.info(f"Scraping {max_posts} posts from @{profile}...")
        result = subprocess.run(["python", "Scraper.py", profile, str(max_posts)], capture_output=True, text=True)
        st.text(result.stdout)
        st.success("✅ Scrape complete. CSV saved.")
