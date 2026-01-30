import os
from PyPDF2 import PdfReader
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Initialize Clients (Resilient)
try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
except Exception as e:
    print(f"Warning: Gemini configuration failed: {e}")

# Pinecone is no longer used. Using RAG Lite (direct text context).

def extract_text_from_pdf(pdf_file):
    try:
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content + "\n"
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""

def extract_text_from_txt(txt_file):
    try:
        content = txt_file.read()
        if isinstance(content, bytes):
            return content.decode('utf-8')
        return content
    except Exception as e:
        print(f"Error extracting TXT: {e}")
        return ""

def generate_ai_response(system_prompt, context, user_query):
    model = genai.GenerativeModel('models/gemini-3-flash-preview')
    prompt = f"{system_prompt}\n\nContext:\n{context}\n\nUser Question: {user_query}\n\nAnswer:"
    response = model.generate_content(prompt)
    return response.text
