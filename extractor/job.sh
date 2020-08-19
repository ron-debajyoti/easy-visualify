#!/bin/sh
source .venv/bin/activate
python3 extractor/extract_top.py
python3 extractor/extract_viral.py