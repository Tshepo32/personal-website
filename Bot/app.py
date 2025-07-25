from flask import Flask, request, jsonify
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import FARMReader, TransformersReader, DensePassageRetriever
from haystack.pipelines import ExtractiveQAPipeline
from haystack.utils import clean_wiki_text, convert_files_to_docs, fetch_archive_from_http

import os

app = Flask(__name__)

# Initialize the Document Store (in-memory)
document_store = InMemoryDocumentStore()

# Load your resume.txt into documents
def load_resume():
    # Path to your resume file
    file_path = "resume.txt"
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"{file_path} not found! Please place your resume.txt in the app folder.")

    # Convert file to docs
    docs = convert_files_to_docs(dir_path=".", clean_func=clean_wiki_text, split_paragraphs=True)
    document_store.write_documents(docs)

# Setup retriever & reader
def setup_pipeline():
    retriever = DensePassageRetriever(document_store=document_store)
    document_store.update_embeddings(retriever)

    # Using a smaller reader model for speed, you can switch to a bigger one if needed
    reader = FARMReader(model_name_or_path="deepset/roberta-base-squad2", use_gpu=False)
    pipe = ExtractiveQAPipeline(reader, retriever)
    return pipe

# Load docs and setup pipeline
load_resume()
pipeline = setup_pipeline()

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question', '')
    if not question:
        return jsonify({"answer": "Please ask a valid question."})

    # Run query on pipeline
    prediction = pipeline.run(query=question, params={"Retriever": {"top_k": 5}, "Reader": {"top_k": 3}})
    answers = prediction.get('answers', [])

    if not answers:
        return jsonify({"answer": "Sorry, I couldn't find an answer in the resume."})

    # Return the best answer text
    best_answer = answers[0].answer
    return jsonify({"answer": best_answer})


if __name__ == "__main__":
    app.run(port=5000)
