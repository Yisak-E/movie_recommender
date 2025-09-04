import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

# Replace with your actual bot token
BOT_TOKEN = "7902399184:AAHovQIXzWegvMWKHbjTDVF1owVnFVyAPIc"

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

# In-memory schedule dictionary
# You can replace this with a database or a file to persist data
SCHEDULE = {
    "monday": "8:00 AM - University Project Meeting\n10:00 AM - Data Structures Lecture",
    "tuesday": "9:30 AM - Software Engineering Class\n1:00 PM - Gym",
    "wednesday": "11:00 AM - Algorithms Class\n3:00 PM - Python Project Work",
    "thursday": "9:00 AM - Database Systems Lecture\n2:00 PM - Research Paper Reading",
    "friday": "10:00 AM - AI Fundamentals Class\n4:00 PM - Group Study Session",
    "saturday": "Free day!",
    "sunday": "Relax and prepare for the week!",
}


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a message when the command /start is issued."""
    user = update.effective_user
    await update.message.reply_html(
        f"Hi {user.full_name}! 👋\nI can help you with your university schedule. "
        "Use /schedule to see your schedule for the day."
    )


async def schedule_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends the schedule for the current day."""
    import datetime

    today = datetime.datetime.now().strftime("%A").lower()  # e.g., "monday"

    if today in SCHEDULE:
        schedule_text = f"Here is your schedule for {today.capitalize()}:\n\n{SCHEDULE[today]}"
    else:
        schedule_text = "I don't have a schedule for today. Enjoy your day!"

    await update.message.reply_text(schedule_text)


def main() -> None:
    """Start the bot."""
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(BOT_TOKEN).build()

    # on different commands - add handlers
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("schedule", schedule_command))

    # Run the bot until you press Ctrl-C
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()