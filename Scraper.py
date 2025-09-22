import instaloader
import csv
import os
from datetime import datetime, timedelta
import sys

# Accept arguments from Streamlit
target_username = sys.argv[1]
max_posts = int(sys.argv[2])
login_user = sys.argv[3]
login_pass = sys.argv[4]

# Settings
usernames = [target_username]
date_range = 'all'
now = datetime.now()
cutoff_map = {
    '7d': timedelta(days=7),
    '30d': timedelta(days=30),
    'YTD': datetime(now.year, 1, 1),
    'all': None
}
cutoff_date = now - cutoff_map[date_range] if date_range in ['7d', '30d'] else cutoff_map.get(date_range)

# Login or load session
L = instaloader.Instaloader()
session_file = f"{login_user}-session"

try:
    if os.path.exists(session_file):
        L.load_session_from_file(login_user)
    else:
        L.login(login_user, login_pass)
        L.save_session_to_file()
except instaloader.TwoFactorAuthRequiredException:
    print("🔐 Two-factor authentication required.")
    code = input("Enter 2FA code: ")
    L.two_factor_login(code)
    L.save_session_to_file()


# Scrape posts
for username in usernames:
    print(f"\n🔍 Scraping: {username}")
    profile = instaloader.Profile.from_username(L.context, username)
    followers = profile.followers

    # Follower log
    with open(f"{username}_followers.csv", 'a', newline='', encoding='utf-8') as f:
        csv.writer(f).writerow([now.strftime('%Y-%m-%d %H:%M'), followers])

    # History tracking
    history_file = f"{username}_tagged.txt"
    tagged_shortcodes = set()
    if os.path.exists(history_file):
        with open(history_file, 'r') as f:
            tagged_shortcodes = set(line.strip() for line in f)

    # Prepare CSV
    filename = f"{username}_history.csv"
    fieldnames = [
        'timestamp', 'shortcode', 'date', 'caption', 'hashtags', 'likes', 'comments',
        'post_type', 'video_type', 'estimated_saves', 'estimated_shares', 'engagement_rate'
    ]
    file_exists = os.path.exists(filename)
    with open(filename, 'a', newline='', encoding='utf-8') as f_csv, open(history_file, 'a', encoding='utf-8') as f_hist:
        writer = csv.DictWriter(f_csv, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()

        count = 0
        for post in profile.get_posts():
            if cutoff_date and post.date < cutoff_date:
                continue
            if post.shortcode in tagged_shortcodes:
                continue
            if count >= max_posts:
                break

            shortcode = post.shortcode
            caption = post.caption or ""
            hashtags = ', '.join(post.caption_hashtags)
            likes = post.likes
            comments = post.comments
            post_type = 'Reel' if post.is_video else 'Photo'
            video_type = "Unlabeled"  # Placeholder

            saves = int(likes * 0.15)
            shares = int(likes * 0.10)
            engagement = round((likes + comments + saves + shares) / followers, 4) if followers else 0

            writer.writerow({
                'timestamp': now.strftime('%Y-%m-%d %H:%M'),
                'shortcode': shortcode,
                'date': post.date.strftime('%Y-%m-%d'),
                'caption': caption,
                'hashtags': hashtags,
                'likes': likes,
                'comments': comments,
                'post_type': post_type,
                'video_type': video_type,
                'estimated_saves': saves,
                'estimated_shares': shares,
                'engagement_rate': engagement
            })

            f_hist.write(shortcode + '\n')
            count += 1

    print(f"✅ Done scraping {username}. {count} new posts added.")

