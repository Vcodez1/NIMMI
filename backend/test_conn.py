import os
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

load_dotenv()

async def test_db():
    url = os.getenv("DATABASE_URL")
    print(f"Testing connection to: {url.split('@')[-1]}") # Hide password
    try:
        engine = create_async_engine(url)
        async with engine.connect() as conn:
            print("✅ Database connection successful!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_db())
