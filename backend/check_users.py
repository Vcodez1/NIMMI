"""
Quick script to check users in the database
"""
import asyncio
import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

async def check_users():
    engine = create_async_engine(
        DATABASE_URL,
        connect_args={
            "prepared_statement_cache_size": 0,
            "statement_cache_size": 0
        }
    )
    
    async with engine.begin() as conn:
        result = await conn.execute(text("SELECT id, email, name, password_hash FROM users LIMIT 10"))
        rows = result.fetchall()
        
        if rows:
            print("\n📋 Users in database:")
            print("-" * 60)
            for row in rows:
                print(f"ID: {row[0]}")
                print(f"Email: {row[1]}")
                print(f"Name: {row[2]}")
                print(f"Password Hash: {'***' + row[3][-20:] if row[3] else 'None'}")
                print("-" * 60)
        else:
            print("\n❌ No users found in the users table")
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_users())
