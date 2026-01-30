import asyncio
import os
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

async def check_bots():
    engine = create_async_engine(
        DATABASE_URL,
        connect_args={
            "prepared_statement_cache_size": 0,
            "statement_cache_size": 0
        }
    )
    
    async with engine.begin() as conn:
        result = await conn.execute(text("SELECT bot_id, bot_name, knowledge_base FROM bots LIMIT 5"))
        rows = result.fetchall()
        
        if rows:
            print("\n📋 Bots in database:")
            print("-" * 60)
            for row in rows:
                print(f"ID: {row[0]}")
                print(f"Name: {row[1]}")
                kb_snippet = str(row[2])[:100] + "..." if row[2] else "None"
                print(f"Knowledge Base: {kb_snippet}")
                print("-" * 60)
        else:
            print("\n❌ No bots found in the bots table")
    
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_bots())
