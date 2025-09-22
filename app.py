import streamlit as st
import subprocess

st.title("Instagram Scraper Demo")
st.write("This tool scrapes Instagram posts, tracks engagement, and lets you manually tag video types.")

insta_user = st.text_input("Your Instagram Username")
insta_pass = st.text_input("Your Instagram Password", type="password")
target_profile = st.text_input("Target Profile to Scrape")
max_posts = st.slider("Max posts to scrape", min_value=1, max_value=100, value=10)

if st.button("Run Scraper"):
    if not insta_user or not insta_pass or not target_profile:
        st.error("Please fill in all fields.")
    else:
        st.info(f"Scraping {max_posts} posts from @{target_profile}...")
        result = subprocess.run(
            ["python3", "Scraper.py", target_profile, str(max_posts), insta_user, insta_pass],
            capture_output=True, text=True
        )
        st.text(result.stdout)
        st.success("✅ Scrape complete. CSV saved.")
