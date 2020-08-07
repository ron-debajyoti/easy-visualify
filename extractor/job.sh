#!/bin/sh
source .venv/bin/activate
pip install -r requirements.txt
python3 extractor/extract_top.py
python3 extractor/extract_viral.py